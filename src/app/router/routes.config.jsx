import { lazy } from 'react'
import { ROLES } from '../config/constants'

// Auth
const LoginPage = lazy(() => import('../../modules/auth/pages/LoginPage'))
const RegisterPage = lazy(() => import('../../modules/auth/pages/RegisterPage'))

// Dashboard
const DashboardPage = lazy(() => import('../../modules/dashboard/pages/DashboardPage'))

// Usuarios
const UsuariosPage = lazy(() => import('../../modules/usuarios/pages/UsuariosPage'))

// Roles
const RolesPage = lazy(() => import('../../modules/roles/pages/RolesPage'))

// Biblioteca
const LibrosPage = lazy(() => import('../../modules/biblioteca/pages/LibrosPage'))
const AutoresPage = lazy(() => import('../../modules/biblioteca/pages/AutoresPage'))
const CategoriasPage = lazy(() => import('../../modules/biblioteca/pages/CategoriasPage'))

// Pagos
const PagosPage = lazy(() => import('../../modules/pagos/pages/PagosPage'))

// Cronogramas
const CronogramaEventosPage = lazy(() => import('../../modules/cronogramas/pages/CronogramaEventosPage'))
const CronogramaCategoriasPage = lazy(() => import('../../modules/cronogramas/pages/CronogramaCategoriasPage'))
const CronogramaDirigidoPage = lazy(() => import('../../modules/cronogramas/pages/CronogramaDirigidoPage'))

// Iglesias
const IglesiasPage = lazy(() => import('../../modules/iglesias/pages/IglesiasPage'))

// Organigrama
const OrganigramaPage = lazy(() => import('../../modules/organigrama/pages/OrganigramaPage'))

// Auditoria
const AuditoriaPage = lazy(() => import('../../modules/auditoria/pages/AuditoriaPage'))

// Notificaciones
const NotificacionesPage = lazy(() => import('../../modules/notificaciones/pages/NotificacionesPage'))

// Errors
const NotFoundPage = lazy(() => import('../../pages/errors/NotFoundPage'))
const ForbiddenPage = lazy(() => import('../../pages/errors/ForbiddenPage'))

// Landing
const LandingPage = lazy(() => import('../../pages/Externas/LagingPage/Index'))
const DonacionesPage = lazy(() => import('../../pages/Externas/Donaciones/DonacionesPage'))
const UbicacionesPage = lazy(() => import('../../pages/Externas/Ubicaciones/Ubicaciones'))
const CalendarioPage = lazy(() => import('../../pages/Externas/Calendario/CalendarView'))
const SinaiPage = lazy(() => import('../../pages/Externas/Sinai/SinaiPage'))

const { ADMIN, TESORERO, BIBLIOTECARIO, SUPERVISOR, USUARIO } = ROLES

const ConfiguracionPage = lazy(() => import('../../modules/configuracion/pages/ConfiguracionPage'))
const GafetesPage = lazy(() => import('../../modules/gafetes/pages/GafetesPage'))

export const routes = [
  { path: '/', component: LandingPage, private: false },
  { path: '/donaciones', component: DonacionesPage, private: false },
  { path: '/ubicaciones', component: UbicacionesPage, private: false },
  { path: '/calendario', component: CalendarioPage, private: false },
  { path: '/escuela-sinai', component: SinaiPage, private: false },
  { path: '/login', component: LoginPage, private: false },
  { path: '/register', component: RegisterPage, private: false },

  // Dashboard
  { path: '/dashboard', component: DashboardPage, private: true, roles: [ADMIN, SUPERVISOR, TESORERO, BIBLIOTECARIO, USUARIO], layout: 'dashboard' },
  
  // Gafetes
  { path: '/gafetes', component: GafetesPage, private: true, roles: [ADMIN, SUPERVISOR, TESORERO, BIBLIOTECARIO, USUARIO], layout: 'dashboard' },

  // Usuarios
  { path: '/usuarios', component: UsuariosPage, private: true, roles: [ADMIN], layout: 'dashboard' },

  // Roles
  { path: '/roles', component: RolesPage, private: true, roles: [ADMIN], layout: 'dashboard' },

  // Biblioteca
  { path: '/biblioteca/libros', component: LibrosPage, private: true, roles: [ADMIN, BIBLIOTECARIO], layout: 'dashboard' },
  { path: '/biblioteca/autores', component: AutoresPage, private: true, roles: [ADMIN, BIBLIOTECARIO], layout: 'dashboard' },
  { path: '/biblioteca/categorias', component: CategoriasPage, private: true, roles: [ADMIN, BIBLIOTECARIO], layout: 'dashboard' },

  // Pagos
  { path: '/pagos', component: PagosPage, private: true, roles: [ADMIN, TESORERO], layout: 'dashboard' },

  // Cronogramas
  { path: '/cronogramas/eventos', component: CronogramaEventosPage, private: true, roles: [ADMIN, SUPERVISOR], layout: 'dashboard' },
  { path: '/cronogramas/categorias', component: CronogramaCategoriasPage, private: true, roles: [ADMIN, SUPERVISOR], layout: 'dashboard' },
  { path: '/cronogramas/dirigido', component: CronogramaDirigidoPage, private: true, roles: [ADMIN, SUPERVISOR], layout: 'dashboard' },

  // Iglesias
  { path: '/iglesias', component: IglesiasPage, private: true, roles: [ADMIN, SUPERVISOR], layout: 'dashboard' },

  // Organigrama
  { path: '/organigrama', component: OrganigramaPage, private: true, roles: [ADMIN], layout: 'dashboard' },

  // Auditoria
  { path: '/auditoria', component: AuditoriaPage, private: true, roles: [ADMIN], layout: 'dashboard' },

  // Notificaciones
  { path: '/notificaciones', component: NotificacionesPage, private: true, roles: [ADMIN, SUPERVISOR, TESORERO, BIBLIOTECARIO, USUARIO], layout: 'dashboard' },

  // Configuración
  { path: '/configuracion', component: ConfiguracionPage, private: true, roles: [ADMIN, SUPERVISOR, TESORERO, BIBLIOTECARIO, USUARIO], layout: 'dashboard' },

  // Errores
  { path: '/403', component: ForbiddenPage, private: false, layout: 'auth' },
  { path: '*', component: NotFoundPage, private: false, layout: 'auth' },
]
