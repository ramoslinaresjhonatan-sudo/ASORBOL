import { MdCheck } from 'react-icons/md'
import styles from './ChipSelect.module.css'

/**
 * Selector visual de chips — soporta selección simple (multiple=false) y múltiple (multiple=true).
 *
 * Props:
 *   label     — texto del label
 *   options   — [{ id, nombre }]
 *   value     — ID seleccionado (simple) | ID[] (múltiple)
 *   onChange  — (newValue) => void
 *   multiple  — false (default) | true
 *   required  — muestra asterisco
 */
const ChipSelect = ({ label, options = [], value, onChange, multiple = false, required }) => {
  const isSelected = (id) =>
    multiple ? (value || []).includes(id) : value === id

  const toggle = (id) => {
    if (multiple) {
      const arr = value || []
      onChange(arr.includes(id) ? arr.filter(v => v !== id) : [...arr, id])
    } else {
      onChange(isSelected(id) ? null : id)
    }
  }

  // count sólo se muestra en modo múltiple
  const count = multiple ? (value || []).length : 0

  return (
    <div className={styles.group}>
      <label className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
        {count > 0 && <span className={styles.badge}>{count} sel.</span>}
      </label>
      <div className={styles.container}>
        {options.length === 0 ? (
          <span className={styles.empty}>Sin opciones</span>
        ) : options.map(opt => {
          const sel = isSelected(opt.id)
          return (
            <button
              key={opt.id}
              type="button"
              className={`${styles.chip} ${sel ? styles.chipOn : ''}`}
              onClick={() => toggle(opt.id)}
            >
              {sel && <MdCheck size={12} />}
              {opt.nombre}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default ChipSelect
