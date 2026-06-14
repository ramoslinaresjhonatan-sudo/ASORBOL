import { ROLES } from '../../app/config/constants'
import {
  MdDashboard, MdPeople, MdSecurity, MdMenuBook, MdPayments,
  MdCalendarMonth, MdChurch, MdAccountTree, MdHistory, MdNotifications, MdBadge
} from 'react-icons/md'

export const navItems = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: <MdDashboard />,
    path: '/dashboard',
    roles: [ROLES.ADMIN, ROLES.SUPERVISOR, ROLES.TESORERO, ROLES.BIBLIOTECARIO, ROLES.USUARIO],
  },
  {
    key: 'usuarios',
    label: 'Usuarios',
    icon: <MdPeople />,
    path: '/usuarios',
    roles: [ROLES.ADMIN],
  },
  {
    key: 'roles',
    label: 'Roles y Permisos',
    icon: <MdSecurity />,
    path: '/roles',
    roles: [ROLES.ADMIN],
  },
  {
    key: 'biblioteca',
    label: 'Biblioteca',
    icon: <MdMenuBook />,
    path: null,
    roles: [ROLES.ADMIN, ROLES.BIBLIOTECARIO],
    children: [
      { key: 'libros', label: 'Libros', path: '/biblioteca/libros' },
      { key: 'autores', label: 'Autores', path: '/biblioteca/autores' },
      { key: 'categorias', label: 'Categorías', path: '/biblioteca/categorias' },
    ],
  },
  {
    key: 'pagos',
    label: 'Pagos',
    icon: <MdPayments />,
    path: '/pagos',
    roles: [ROLES.ADMIN, ROLES.TESORERO],
  },
  {
    key: 'cronogramas',
    label: 'Cronogramas',
    icon: <MdCalendarMonth />,
    path: null,
    roles: [ROLES.ADMIN, ROLES.SUPERVISOR],
    children: [
      { key: 'eventos', label: 'Eventos', path: '/cronogramas/eventos' },
      { key: 'categorias-cronograma', label: 'Categorías', path: '/cronogramas/categorias' },
      { key: 'dirigido', label: 'Dirigido a', path: '/cronogramas/dirigido' },
    ],
  },
  {
    key: 'iglesias',
    label: 'Iglesias',
    icon: <MdChurch />,
    path: '/iglesias',
    roles: [ROLES.ADMIN, ROLES.SUPERVISOR],
  },
  {
    key: 'organigrama',
    label: 'Organigrama',
    icon: <MdAccountTree />,
    path: '/organigrama',
    roles: [ROLES.ADMIN],
  },
  {
    key: 'auditoria',
    label: 'Auditoría',
    icon: <MdHistory />,
    path: '/auditoria',
    roles: [ROLES.ADMIN],
  },
  {
    key: 'notificaciones',
    label: 'Notificaciones',
    icon: <MdNotifications />,
    path: '/notificaciones',
    roles: [ROLES.ADMIN, ROLES.SUPERVISOR, ROLES.TESORERO, ROLES.BIBLIOTECARIO, ROLES.USUARIO],
  },
  {
    key: 'gafetes',
    label: 'Gafetes',
    icon: <MdBadge />,
    path: '/gafetes',
    roles: [ROLES.ADMIN, ROLES.SUPERVISOR, ROLES.TESORERO, ROLES.BIBLIOTECARIO, ROLES.USUARIO],
  },
]
