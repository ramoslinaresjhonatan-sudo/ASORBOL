export const mockUsuarios = [
  { id: 1, nombres: 'Admin Sistema', apellidos: '', email: 'admin@sorbol.com', tipo: 'ADMIN', estado: true },
  { id: 2, nombres: 'María', apellidos: 'Rodríguez', email: 'maria@sorbol.com', tipo: 'TESORERO', estado: true },
  { id: 3, nombres: 'Carlos', apellidos: 'López', email: 'carlos@sorbol.com', tipo: 'BIBLIOTECARIO', estado: true },
]

export const mockRoles = [
  { 
    id: 1, 
    nombre: 'ADMIN', 
    descripcion: 'Acceso total al sistema',
    permisos: ['inventory.*', 'locations.*', 'users.*', 'finance.*', 'audit.*']
  },
  { 
    id: 2, 
    nombre: 'TESORERO', 
    descripcion: 'Gestión de pagos y finanzas',
    permisos: ['finance.view_pago', 'finance.add_pago', 'finance.change_pago', 'finance.view_validacionia']
  },
  { 
    id: 3, 
    nombre: 'BIBLIOTECARIO', 
    descripcion: 'Gestión de biblioteca',
    permisos: ['inventory.view_libro', 'inventory.add_libro', 'inventory.change_libro', 'inventory.view_autor', 'inventory.view_categoria']
  },
  { 
    id: 4, 
    nombre: 'SUPERVISOR', 
    descripcion: 'Supervisión de actividades',
    permisos: ['inventory.view_libro', 'locations.view_iglesia', 'finance.view_pago', 'users.view_user']
  },
  { 
    id: 5, 
    nombre: 'USUARIO', 
    descripcion: 'Acceso básico',
    permisos: ['inventory.view_libro', 'locations.view_iglesia']
  },
]

export const mockLibros = [
  { id: 1, titulo: 'La Biblia de Estudio', isbn: '978-0-06-062378-0', stock: 15, estado: true, editorial: 'Sociedad Bíblica', autorId: 1, categoriaId: 1 },
  { id: 2, titulo: 'Gracia y Verdad', isbn: '978-0-06-062378-1', stock: 8, estado: true, editorial: 'Editorial Vida', autorId: 2, categoriaId: 1 },
  { id: 3, titulo: 'El Propósito que me Impulsa', isbn: '978-0-06-062378-2', stock: 20, estado: true, editorial: 'Vida Publishers', autorId: 3, categoriaId: 3 },
]

export const mockPagos = [
  { id: 1, usuario: 'María Rodríguez', monto: 150.00, banco: 'Bancolombia', estado: 'APROBADO', fecha_pago: '2026-05-01' },
  { id: 2, usuario: 'Carlos López', monto: 75.00, banco: 'Davivienda', estado: 'PENDIENTE', fecha_pago: '2026-05-10' },
  { id: 3, usuario: 'Juan Pérez', monto: 200.00, banco: 'Nequi', estado: 'RECHAZADO', fecha_pago: '2026-05-11' },
]

export const mockIglesias = [
  { id: 1, nombre: 'Iglesia Central', departamento: 'Cundinamarca', estado: true },
  { id: 2, nombre: 'Iglesia Norte', departamento: 'Antioquia', estado: true },
]

export const mockCronogramaCategorias = [
  { id: 1, nombre: 'Ministerial', descripcion: 'Eventos para el liderazgo de la iglesia' },
  { id: 2, nombre: 'Espiritual', descripcion: 'Retiros, vigilias y cultos especiales' },
  { id: 3, nombre: 'Misión', descripcion: 'Campañas de evangelismo y servicio social' },
]

export const mockCronogramaDirigido = [
  { id: 1, nombre: 'Jóvenes' },
  { id: 2, nombre: 'Adultos' },
  { id: 3, nombre: 'Familias' },
  { id: 4, nombre: 'Niños' },
  { id: 5, nombre: 'Maestras' },
  { id: 6, nombre: 'Pastores' },
  { id: 7, nombre: 'Directores de Iglesia' },
]

export const mockCronogramaEventos = [
  { 
    id: 1, 
    evento: 'Retiro Espiritual 2026', 
    categoriaId: 2, 
    dirigidoIds: [1, 3], // Jóvenes y Familias
    fecha_inicio: '2026-06-15', 
    fecha_fin: '2026-06-17', 
    lugar: 'Melgar', 
    estado: 'PROGRAMADO',
    foto: 'https://images.unsplash.com/photo-1523580494863-6f30312245d5?auto=format&fit=crop&q=80&w=400',
    afiche: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&q=80&w=400'
  },
  { 
    id: 2, 
    evento: 'Capacitación Ministerial', 
    categoriaId: 1, 
    dirigidoIds: [6, 7], // Pastores y Directores
    fecha_inicio: '2026-07-01', 
    fecha_fin: '2026-07-01', 
    lugar: 'Bogotá', 
    estado: 'PROGRAMADO',
    foto: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=400'
  },
]

export const mockAutores = [
  { id: 1, nombre: 'Ellen G. White', nacionalidad: 'Estadounidense', especialidad: 'Teología', estado: true },
  { id: 2, nombre: 'Charles Spurgeon', nacionalidad: 'Británico', especialidad: 'Sermonario', estado: true },
  { id: 3, nombre: 'C.S. Lewis', nacionalidad: 'Irlandés', especialidad: 'Literatura Cristiana', estado: true },
]

export const mockCategorias = [
  { id: 1, nombre: 'Teología', descripcion: 'Estudio de la naturaleza de Dios', estado: true },
  { id: 2, nombre: 'Historia', descripcion: 'Historia de la iglesia y el cristianismo', estado: true },
  { id: 3, nombre: 'Vida Cristiana', descripcion: 'Crecimiento espiritual y consejos prácticos', estado: true },
  { id: 4, nombre: 'Liderazgo', descripcion: 'Principios de liderazgo bíblico', estado: true },
]

export const mockOrganigrama = {
  id: "root-1",
  nombre: "Dra. Elena Rodríguez",
  puesto: "Junta Directiva",
  telefono: "+57 300 123 4567",
  foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
  children: [
    {
      id: "node-2",
      nombre: "Pr. Carlos Méndez",
      puesto: "Pastor Distrital",
      telefono: "+57 310 987 6543",
      foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
      children: [
        {
          id: "node-3",
          nombre: "Ricardo Gómez",
          puesto: "Primer Anciano",
          telefono: "+57 320 111 2222",
          foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
          children: [
            { id: "node-4", nombre: "Samuel Torres", puesto: "Diaconía", telefono: "+57 300 000 0001", foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400" },
            { id: "node-5", nombre: "Marta Lucía Soto", puesto: "Secretaria", telefono: "+57 300 000 0002", foto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400" }
          ]
        },
        {
          id: "node-6",
          nombre: "Andrés Villareal",
          puesto: "Tesorero",
          telefono: "+57 315 555 4444",
          foto: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=400",
          children: [
            { id: "node-7", nombre: "Claudia Peña", puesto: "Auditoría", telefono: "+57 300 000 0003", foto: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400" }
          ]
        }
      ]
    },
    {
      id: "node-8",
      nombre: "Ing. Jorge Martínez",
      puesto: "Director de Departamentos",
      telefono: "+57 300 999 8888",
      foto: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=400",
      children: [
        { id: "node-9", nombre: "Beatriz Arango", puesto: "Escuela Sabática", telefono: "+57 301 111 2222", foto: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400" },
        { id: "node-10", nombre: "Mateo Holguín", puesto: "Ministerio Joven", telefono: "+57 302 222 3333", foto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400" },
        { id: "node-11", nombre: "Luciana Vélez", puesto: "Evangelismo", telefono: "+57 303 333 4444", foto: "https://images.unsplash.com/photo-1519085185758-20ddbbd2ba09?auto=format&fit=crop&q=80&w=400" }
      ]
    }
  ]
}
