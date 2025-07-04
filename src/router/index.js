
import { createRouter, createWebHistory } from 'vue-router'


const HomeContractingComponent = () => import('../public/pages/homeContracting.component.vue')
const HomeTechnicianComponent = () => import('../public/pages/homeTechnician.component.vue')
const AboutComponent = () => import('../public/pages/about.component.vue')
const PageNotFoundComponent = () => import('../public/pages/page-not-found.component.vue')
const ElectricalComponentRegistrationPage = () => import('../assets/electricalComponents/pages/electrical-component-page.component.vue')
const TechnicianInventoryPage = () => import('../assets/electricalComponents/pages/technician-inventory-page.component.vue');
const AnalyticsManagementComponent = () => import('../analitycsDashboard/pages/analytics-management.component.vue')

// New Components
const ComponentManagementPage = () => import('../assets/electricalComponents/pages/component-management-page.component.vue');
const ComponentTypeManagementPage = () => import('../assets/electricalComponents/pages/component-type-management-page.component.vue');
const PropertyManagementPage = () => import('../assets/properties/pages/property-management-page.component.vue');

const routes = [
  { path: '/homeTechnician', name: 'homeTechnician', component: HomeTechnicianComponent, meta: { title: 'Home Contracting' } },
  { path: '/homeContracting', name: 'homeContracting', component: HomeContractingComponent, meta: { title: 'Home Technician' } },
  { path: '/analytics' , name: 'analytics-management', component: AnalyticsManagementComponent, meta: { title: 'Analytics Management' } },
  { path: "/electrical-component-registration", name: "electrical-component-registration", component: ComponentManagementPage, meta: { title: 'Registro de Componente Eléctrico' } },
  { path: "/electrical-component-type", name: "electrical-component-type", component: ComponentTypeManagementPage, meta: { title: 'Registro de Tipo de Componente Eléctrico' } },
  { path: '/technician-inventory/:technicianId?',component:TechnicianInventoryPage , meta: { title: 'Technician inventory' }},
  { path: '/property',component:PropertyManagementPage , meta: { title: 'Property Management' }},
  { path: '/about', name: 'about', component: AboutComponent, meta: { title: 'About us' } },
  { path: '/', name: 'default', redirect: { name: 'homeTechnician' } },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: PageNotFoundComponent, meta: { title: 'Page not found' } },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})


router.beforeEach((to, from, next) => {
  console.log(`Navigating from ${from.name || 'N/A'} to ${to.name || 'N/A'}`)
  const baseTitle = 'ElectroLink - Center for Technicians and Contractors'
  document.title = `${baseTitle} | ${to.meta.title || 'ElectroLink'}`
  next()
})

export default router
