import { useEffect, useMemo, useState } from 'react';

const SLOTS_VERSION = '2024-09-04';
const BOOKING_VERSION = '2024-08-13';

function splitLink(calLink) {
  const [username, eventTypeSlug] = String(calLink || '').split('/');
  return { username, eventTypeSlug: eventTypeSlug || '' };
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function monthKey(year, month) {
  return `${year}-${pad(month + 1)}`;
}

function dayKeyFromParts(year, month, day) {
  return `${year}-${pad(month + 1)}-${pad(day)}`;
}

function dayKey(iso, timeZone) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(iso));
}

function formatTime(iso, timeZone) {
  return new Intl.DateTimeFormat(undefined, {
    timeZone,
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(iso));
}

function formatDay(key) {
  const [year, month, day] = key.split('-').map(Number);
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(new Date(year, month - 1, day));
}

function formatStamp(iso, timeZone) {
  const date = new Date(iso);
  const day = new Intl.DateTimeFormat(undefined, { timeZone, day: 'numeric' }).format(date);
  return `${day} · ${formatTime(iso, timeZone)}`;
}

function weekdayLabels() {
  return Array.from({ length: 7 }, (_, index) =>
    new Intl.DateTimeFormat(undefined, { weekday: 'narrow' }).format(new Date(2024, 0, 7 + index))
  );
}

function monthLabel(year, month) {
  const now = new Date();
  return new Intl.DateTimeFormat(undefined, {
    month: 'long',
    year: year === now.getFullYear() ? undefined : 'numeric',
  }).format(new Date(year, month, 1));
}

function IconButton({ label, disabled, onClick, children }) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-700 transition hover:bg-zinc-100 disabled:pointer-events-none disabled:opacity-30 dark:text-zinc-200 dark:hover:bg-white/10"
    >
      {children}
    </button>
  );
}

function Chevron({ direction }) {
  const path = direction === 'left' ? 'M12.5 5L7.5 10L12.5 15' : 'M7.5 5L12.5 10L7.5 15';
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d={path}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="6.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 6.75V10l2 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <rect x="3" y="5.5" width="9.5" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12.5 8.5L16.5 6.5V13.5L12.5 11.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M5 10.5L8.2 13.5L15 6.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Booker({ calLink }) {
  const { username, eventTypeSlug } = splitLink(calLink);
  const minutes = (eventTypeSlug.match(/^\d+/) || [])[0];
  const now = new Date();
  const [cursor, setCursor] = useState({ year: now.getFullYear(), month: now.getMonth() });
  const [timeZone, setTimeZone] = useState('');
  const [slots, setSlots] = useState(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC');
  }, []);

  useEffect(() => {
    if (!username || !eventTypeSlug || !timeZone) return undefined;
    const controller = new AbortController();
    const { year, month } = cursor;
    const start = `${monthKey(year, month)}-01`;
    const endDate = new Date(year, month + 1, 1);
    const end = dayKeyFromParts(endDate.getFullYear(), endDate.getMonth(), 1);
    const params = new URLSearchParams({
      start,
      end,
      username,
      eventTypeSlug,
      timeZone,
    });

    setLoading(true);
    setFailed(false);
    setSlots(null);
    fetch(`https://api.cal.com/v2/slots?${params}`, {
      headers: { 'cal-api-version': SLOTS_VERSION },
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error('slots');
        return response.json();
      })
      .then((payload) => {
        const grouped = {};
        Object.values(payload.data || {}).forEach((list) => {
          list.forEach((slot) => {
            if (new Date(slot.start) <= new Date()) return;
            const key = dayKey(slot.start, timeZone);
            if (!grouped[key]) grouped[key] = [];
            grouped[key].push(slot.start);
          });
        });
        Object.values(grouped).forEach((list) => list.sort());
        setSlots(grouped);
        setSelectedDay((current) => {
          if (current && grouped[current]?.length) return current;
          const today = dayKey(new Date().toISOString(), timeZone);
          if (grouped[today]?.length) return today;
          return Object.keys(grouped).sort()[0] || null;
        });
        setSelectedSlot(null);
        setStatus('idle');
      })
      .catch((error) => {
        if (error.name === 'AbortError') return;
        setFailed(true);
        setSlots({});
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [username, eventTypeSlug, timeZone, cursor]);

  const labels = useMemo(() => weekdayLabels(), []);
  const days = useMemo(() => {
    const first = new Date(cursor.year, cursor.month, 1).getDay();
    const count = new Date(cursor.year, cursor.month + 1, 0).getDate();
    return { first, count };
  }, [cursor]);
  const times = selectedDay && slots ? slots[selectedDay] || [] : [];
  const atCurrentMonth = cursor.year === now.getFullYear() && cursor.month === now.getMonth();

  const shiftMonth = (amount) => {
    setCursor((current) => {
      const date = new Date(current.year, current.month + amount, 1);
      return { year: date.getFullYear(), month: date.getMonth() };
    });
    setSelectedSlot(null);
    setStatus('idle');
  };

  const book = async (event) => {
    event.preventDefault();
    if (!selectedSlot || status === 'saving') return;
    setStatus('saving');
    setError('');
    try {
      const response = await fetch('https://api.cal.com/v2/bookings', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'cal-api-version': BOOKING_VERSION,
        },
        body: JSON.stringify({
          start: selectedSlot,
          eventTypeSlug,
          username,
          attendee: {
            name: name.trim(),
            email: email.trim(),
            timeZone: timeZone || 'UTC',
            language: 'en',
          },
        }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        const message = payload?.error?.message || '';
        throw new Error(message.split(',')[0] || 'Try again');
      }
      setStatus('done');
    } catch (caught) {
      setStatus('idle');
      setError(caught.message || 'Try again');
    }
  };

  return (
    <div className="bg-white/85 dark:bg-zinc-950/80 overflow-hidden rounded-[28px] border border-white/80 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.55)] backdrop-blur-xl dark:border-white/10 dark:shadow-[0_30px_80px_-36px_rgba(0,0,0,0.85)]">
      <div className="flex items-center justify-between gap-3 px-4 pt-4 sm:px-5">
        <div className="flex items-center">
          <IconButton
            label="Previous month"
            disabled={atCurrentMonth}
            onClick={() => shiftMonth(-1)}
          >
            <Chevron direction="left" />
          </IconButton>
          <p className="min-w-[7.5rem] text-center text-sm font-medium tracking-tight text-zinc-900 dark:text-white">
            {monthLabel(cursor.year, cursor.month)}
          </p>
          <IconButton label="Next month" onClick={() => shiftMonth(1)}>
            <Chevron direction="right" />
          </IconButton>
        </div>
        <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-300">
          <span className="inline-flex items-center gap-1 rounded-full border border-zinc-200 px-2.5 py-1 text-[11px] font-medium text-zinc-600 dark:border-white/10 dark:text-zinc-300">
            <ClockIcon />
            {minutes ? `${minutes} min` : 'Call'}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-zinc-200 px-2.5 py-1 text-[11px] font-medium text-zinc-600 dark:border-white/10 dark:text-zinc-300">
            <VideoIcon />
            Video
          </span>
        </div>
      </div>

      <div className="mt-2 grid md:grid-cols-[minmax(0,1fr)_12.75rem]">
        <div className="px-4 pt-2 pb-5 sm:px-6">
          <div className="mx-auto grid max-w-[22rem] grid-cols-7 gap-y-1">
            {labels.map((label, index) => (
              <div
                key={index}
                className="pb-2 text-center text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-400"
              >
                {label}
              </div>
            ))}
            {Array.from({ length: days.first }).map((_, index) => (
              <div key={`blank-${index}`} />
            ))}
            {Array.from({ length: days.count }).map((_, index) => {
              const day = index + 1;
              const key = dayKeyFromParts(cursor.year, cursor.month, day);
              const open = Boolean(slots?.[key]?.length);
              const selected = key === selectedDay;
              const today = key === dayKey(new Date().toISOString(), timeZone || 'UTC');
              return (
                <div key={key} className="flex justify-center">
                  <button
                    type="button"
                    disabled={!open || loading}
                    onClick={() => {
                      setSelectedDay(key);
                      setSelectedSlot(null);
                      setStatus('idle');
                      setError('');
                    }}
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm tabular-nums transition ${
                      selected
                        ? 'bg-[#1d4ed8] font-medium text-white'
                        : open
                        ? 'font-medium text-zinc-900 hover:bg-zinc-100 dark:text-white dark:hover:bg-white/10'
                        : 'text-zinc-300 dark:text-zinc-700'
                    } ${today && !selected ? 'ring-1 ring-zinc-300 dark:ring-zinc-600' : ''}`}
                  >
                    {day}
                  </button>
                </div>
              );
            })}
          </div>
          {failed ? (
            <div className="mt-4 flex justify-center">
              <IconButton label="Try again" onClick={() => setCursor({ ...cursor })}>
                <Chevron direction="right" />
              </IconButton>
            </div>
          ) : null}
        </div>

        <div className="border-t border-zinc-200/80 px-4 py-4 dark:border-white/10 md:border-t-0 md:border-l">
          {status === 'done' && selectedSlot ? (
            <div className="flex h-full min-h-[16rem] flex-col items-center justify-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1d4ed8] text-white">
                <CheckIcon />
              </span>
              <p className="text-sm font-medium text-zinc-900 dark:text-white">Booked</p>
              <p className="text-sm tabular-nums text-zinc-500 dark:text-zinc-400">
                {formatStamp(selectedSlot, timeZone || 'UTC')}
              </p>
              <p className="max-w-[16rem] text-center text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                Check your email for the invite.
              </p>
            </div>
          ) : selectedSlot ? (
            <form
              onSubmit={book}
              className="flex h-full min-h-[16rem] flex-col justify-center gap-2.5"
            >
              <div className="mb-1 flex items-center justify-between">
                <IconButton
                  label="Back"
                  onClick={() => {
                    setSelectedSlot(null);
                    setError('');
                  }}
                >
                  <Chevron direction="left" />
                </IconButton>
                <p className="pr-2 text-sm font-medium tabular-nums text-zinc-900 dark:text-white">
                  {formatTime(selectedSlot, timeZone || 'UTC')}
                </p>
              </div>
              <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                Name and email for the invite.
              </p>
              <input
                aria-label="Name"
                placeholder="Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                autoComplete="name"
                className="h-11 rounded-full border border-zinc-200 bg-transparent px-4 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-[#1d4ed8] dark:border-white/10 dark:text-white"
              />
              <input
                aria-label="Email"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                autoComplete="email"
                className="h-11 rounded-full border border-zinc-200 bg-transparent px-4 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-[#1d4ed8] dark:border-white/10 dark:text-white"
              />
              <button
                type="submit"
                disabled={status === 'saving'}
                className="mt-1 flex h-11 items-center justify-center rounded-full bg-[#1d4ed8] text-sm font-medium text-white transition hover:bg-[#1e40af] disabled:opacity-60"
              >
                {status === 'saving' ? 'Booking…' : 'Book'}
              </button>
              {error ? <p className="text-center text-xs text-red-500">{error}</p> : null}
            </form>
          ) : (
            <div className="flex max-h-72 flex-col gap-2 overflow-y-auto pr-1 md:max-h-[22rem]">
              <div className="mb-1 shrink-0">
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-400">
                  Choose a time
                </p>
                {selectedDay ? (
                  <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-white">
                    {formatDay(selectedDay)}
                  </p>
                ) : null}
              </div>
              {loading
                ? Array.from({ length: 7 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-10 animate-pulse rounded-full bg-zinc-100 dark:bg-white/5"
                    />
                  ))
                : times.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => {
                        setSelectedSlot(slot);
                        setError('');
                      }}
                      className="h-10 shrink-0 rounded-full border border-zinc-200 text-sm tabular-nums text-zinc-800 transition hover:border-zinc-900 hover:bg-zinc-50 dark:border-white/10 dark:text-zinc-100 dark:hover:border-white/40 dark:hover:bg-white/5"
                    >
                      {formatTime(slot, timeZone || 'UTC')}
                    </button>
                  ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
