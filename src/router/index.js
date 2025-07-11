// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'

// ───────────────────────────────────────
// 1.  Páginas públicas
// ───────────────────────────────────────
const HomeContractingComponent   = () => import('../public/pages/homeContracting.component.vue')
const HomeTechnicianComponent    = () => import('../public/pages/homeTechnician.component.vue')
const AboutComponent             = () => import('../public/pages/about.component.vue')
const PageNotFoundComponent      = () => import('../public/pages/page-not-found.component.vue')

// ───────────────────────────────────────
// 2.  IAM (auth)
// ───────────────────────────────────────
const SignInPage  = () => import('../iam/pages/sign-in.component.vue')
const SignUpPage  = () => import('../iam/pages/sign-up.component.vue')
// ───────────────────────────────────────
// 2.  SDP (Service Design and Planning)
// ───────────────────────────────────────
const RequestsView = () => import('@/ServiceDesignAndPlanning/pages/requests-view.page.vue')
const RequestCreate = () => import('@/ServiceDesignAndPlanning/pages/request-create.page.vue')
const ScheduleView = () => import('@/ServiceDesignAndPlanning/pages/schedule-view.page.vue')
const ScheduleCreate = () => import('@/ServiceDesignAndPlanning/pages/schedule-create.page.vue')
const ServiceView = () => import('@/ServiceDesignAndPlanning/pages/service-view.page.vue')
const ServiceCreate = () => import('@/ServiceDesignAndPlanning/pages/service-create.page.vue')
// ───────────────────────────────────────
// 3.  Funcionalidades
// ───────────────────────────────────────
const TechnicianInventoryPage    = () => import('../assets/electricalComponents/pages/technician-inventory-page.component.vue')
const AnalyticsManagementComponent = () => import('../analitycsDashboard/pages/analytics-management.component.vue')
const ComponentManagementPage    = () => import('../assets/electricalComponents/pages/component-management-page.component.vue')
const ComponentTypeManagementPage = () => import('../assets/electricalComponents/pages/component-type-management-page.component.vue')
const PropertyManagementPage     = () => import('../assets/properties/pages/property-management-page.component.vue')

// ───────────────────────────────────────
// 4.  Tabla de rutas
// ───────────────────────────────────────
const routes = [
  // IAM
  { path: '/sign-in',  name: 'sign-in',  component: SignInPage, meta: { title: 'Sign In'  } },
  { path: '/sign-up',  name: 'sign-up',  component: SignUpPage, meta: { title: 'Sign Up'  } },

  // Home / landing
  { path: '/homeTechnician',  name: 'homeTechnician',  component: HomeTechnicianComponent,  meta: { title: 'Home Technician'   } },
  { path: '/homeContracting', name: 'homeContracting', component: HomeContractingComponent, meta: { title: 'Home Contracting'  } },

  // Funcionalidades
  { path: '/analytics',                     name: 'analytics-management',          component: AnalyticsManagementComponent, meta: { title: 'Analytics Management' } },
  { path: '/electrical-components/:id?', name: 'electrical-component-registration', component: ComponentManagementPage,    meta: { title: 'Registro de Componente Eléctrico' } },
  { path: '/electrical-component-type',        name: 'electrical-component-type',        component: ComponentTypeManagementPage, meta: { title: 'Registro de Tipo de Componente Eléctrico' } },
  { path: '/technician-inventory/:id?',  name: 'technician-inventory', component: TechnicianInventoryPage,  meta: { title: 'Technician Inventory' } },
  { path: '/property/:id?', component: PropertyManagementPage, meta: { title: 'Property Management' } },

    // SDP (Service Design and Planning)
  { path: '/requests/:ownerId', name: 'owner-requests', component: RequestsView, meta: { title: 'Requests' } },
  { path: '/requests/:ownerId/new', name: 'create-request', component: RequestCreate, meta: { title: 'New Request' } },
  { path: '/schedules/:ownerId', name: 'schedules', component: ScheduleView, meta: { title: 'Schedules' } },
  { path: '/schedules/:ownerId/new', name: 'create-schedule', component: ScheduleCreate, meta: { title: 'New Schedule' } },
  { path: '/services/:ownerId?', name: 'services', component: ServiceView, meta: { title: 'Services' } },
  { path: '/services/:ownerId?/new', name: 'create-service', component: ServiceCreate, meta: { title: 'New Service' } },
  // Página informativa
  { path: '/about', name: 'about', component: AboutComponent, meta: { title: 'About us' } },

  // Redirección por defecto ► cámbiala si lo necesitas
  { path: '/', name: 'default', redirect: { name: 'sign-in' } },

  // 404
  { path: '/:pathMatch(.*)*', name: 'not-found', component: PageNotFoundComponent, meta: { title: 'Page not found' } }
]

// ───────────────────────────────────────
// 5.  Instancia de router
// ───────────────────────────────────────
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// ───────────────────────────────────────
// 6.  Guard global: título dinámico y logs
// ───────────────────────────────────────
router.beforeEach((to, from, next) => {
  console.log(`Navigating from ${from.name || 'N/A'} to ${to.name || 'N/A'}`)
  const baseTitle = 'ElectroLink - Center for Technicians and Contractors'
  document.title = `${baseTitle} | ${to.meta.title || 'ElectroLink'}`
  next()
})

export default router
