import { ChevronLeft, X } from 'lucide-react'
import { AnimatePresence, m as motion, useReducedMotion } from 'motion/react'
import { useId, useState } from 'react'
import { images } from '../../../data/images'
import { packs, serviceCategories } from '../../../data/salon'
import { useLang } from '../../../i18n'
import { bookables, firstOpenDate, slotsFor, validateBooking } from '../../../lib/booking'
import { EASE } from '../../../lib/motion'
import { bookingMessage, whatsappUrl } from '../../../lib/whatsapp'
import { Button } from '../../ui/Button'
import { AppointmentCard } from './AppointmentCard'
import { Done } from './Done'
import { Progress } from './Progress'
import { StepDetails } from './StepDetails'
import { StepMoment } from './StepMoment'
import { StepService } from './StepService'

const STEPS = [
  { id: 'service', fields: ['service'] },
  { id: 'moment', fields: ['date', 'time'] },
  { id: 'details', fields: ['name', 'phone', 'note', 'consent'] },
]

const imageOf = (id) => {
  const pack = packs.find((p) => p.id === id)
  if (pack) return images.packs[pack.image]
  const category = serviceCategories.find((c) => c.services.some((s) => s.id === id))
  return category ? images.treatments[category.id] : images.lounge
}

// Opening choreography: header, progress, step, footer rise in turn after the panel lands.
const rise = (reduce, i) =>
  reduce ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: EASE, delay: 0.3 + i * 0.08 } }

/** The booking, start to finish: three steps beside the live appointment card, then "ready". */
export function BookingFlow({ titleId, initialService, onClose }) {
  const { t, l, lang, rtl } = useLang()
  const reduce = useReducedMotion()
  const uid = useId()
  const [v, setV] = useState(() => ({
    service: initialService,
    date: firstOpenDate(),
    time: '',
    name: '',
    phone: '',
    note: '',
    consent: false,
  }))
  const [errors, setErrors] = useState({})
  const [step, setStep] = useState(initialService ? 1 : 0) // a row's "Réserver" already chose the treatment
  const [dir, setDir] = useState(1)
  const [sentUrl, setSentUrl] = useState(null)
  const item = bookables.find((b) => b.id === v.service)
  const last = step === STEPS.length - 1

  const set = (key, value) => {
    setV((prev) => {
      const next = { ...prev, [key]: value }
      if (key === 'date' && !slotsFor(value).includes(prev.time)) next.time = '' // keep time only if still valid
      return next
    })
    if (errors[key]) setErrors(({ [key]: _, ...rest }) => rest)
  }
  const id = (key) => `${uid}-${key}`
  const err = (key) => errors[key] && t(`booking.errors.${errors[key]}`)
  const field = (key) => ({
    id: id(key),
    name: key,
    value: v[key],
    onChange: (e) => set(key, e.target.value),
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `${id(key)}-error` : undefined,
  })
  const goTo = (n) => (setDir(n > step ? 1 : -1), setStep(n))

  function onSubmit(e) {
    e.preventDefault()
    const all = validateBooking(v)
    const found = Object.fromEntries(Object.entries(all).filter(([k]) => STEPS[step].fields.includes(k)))
    setErrors(found)
    const first = STEPS[step].fields.find((k) => found[k])
    if (first) return document.getElementById(id(first))?.focus()
    if (!last) return goTo(step + 1)

    const url = whatsappUrl(bookingMessage({ ...v, serviceName: l(item.name) }, lang))
    const win = window.open(url, '_blank')
    if (win) win.opener = null
    setSentUrl(url) // the "ready" screen keeps a link, in case the popup was blocked
  }

  const slide = (d) => (reduce ? 0 : 32 * d * (rtl ? -1 : 1))
  const steps = [
    <StepService key="service" id={id('service')} value={v.service} onChange={(x) => set('service', x)} error={err('service')} />,
    <StepMoment
      key="moment"
      ids={{ date: id('date'), time: id('time') }}
      date={v.date}
      time={v.time}
      onDate={(x) => set('date', x)}
      onTime={(x) => set('time', x)}
      errors={{ date: err('date'), time: err('time') }}
    />,
    <StepDetails
      key="details"
      field={field}
      err={err}
      consent={{ ...field('consent'), value: undefined, checked: v.consent, onChange: (e) => set('consent', e.target.checked) }}
    />,
  ]

  return (
    <div className="grid h-full lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <AppointmentCard item={item} image={imageOf(v.service)} date={v.date} time={v.time} name={v.name} />

      <form noValidate onSubmit={onSubmit} className="flex min-h-0 min-w-0 flex-col">
        <motion.div {...rise(reduce, 0)} className="flex items-start justify-between gap-6 px-6 pt-6 lg:px-12 lg:pt-10">
          <h2 id={titleId} className="text-h3">{t('booking.title')}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('common.close')}
            className="-me-3 -mt-2 inline-flex size-11 shrink-0 items-center justify-center text-stone transition-colors hover:text-charcoal"
          >
            <X size={20} strokeWidth={1.25} aria-hidden="true" />
          </button>
        </motion.div>

        <div className="mt-4">
          <AppointmentCard compact item={item} image={imageOf(v.service)} date={v.date} time={v.time} name={v.name} />
        </div>

        {!sentUrl && (
          <motion.div {...rise(reduce, 1)}>
            <Progress steps={STEPS} step={step} onGo={goTo} />
          </motion.div>
        )}

        <motion.div {...rise(reduce, 2)} data-lenis-prevent className="min-h-0 flex-1 overflow-y-auto px-6 py-8 lg:px-12">
          <AnimatePresence mode="wait" initial={false} custom={dir}>
            <motion.div
              key={sentUrl ? 'done' : step}
              custom={dir}
              variants={{
                enter: (d) => ({ opacity: 0, x: slide(d) }),
                center: { opacity: 1, x: 0 },
                exit: (d) => ({ opacity: 0, x: slide(-d) }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: EASE }}
            >
              {sentUrl ? <Done /> : steps[step]}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div {...rise(reduce, 3)} className="flex items-center justify-between gap-4 border-t border-sand px-6 py-4 lg:px-12 lg:py-6">
          {sentUrl ? (
            <>
              <button type="button" onClick={onClose} className="min-h-11 text-meta font-medium uppercase tracking-label text-stone hover:text-charcoal">
                {t('common.close')}
              </button>
              <Button variant="solid" href={sentUrl}>
                {t('booking.doneOpen')}
              </Button>
            </>
          ) : (
            <>
              {step > 0 ? (
                <button
                  type="button"
                  onClick={() => goTo(step - 1)}
                  className="inline-flex min-h-11 items-center gap-2 text-meta font-medium uppercase tracking-label text-stone transition-colors hover:text-charcoal"
                >
                  <ChevronLeft size={16} strokeWidth={1.25} aria-hidden="true" className="rtl:-scale-x-100" />
                  {t('booking.back')}
                </button>
              ) : (
                <span />
              )}
              <Button type="submit" variant="solid">
                {t(last ? 'booking.submit' : 'booking.continue')}
              </Button>
            </>
          )}
        </motion.div>
      </form>
    </div>
  )
}
