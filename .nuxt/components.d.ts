
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T> = DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>> & T

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }> & T


export const UserProfile: typeof import("../app/components/UserProfile.vue")['default']
export const AddButton: typeof import("../app/components/button/AddButton.vue")['default']
export const BaseCard: typeof import("../app/components/card/BaseCard.vue")['default']
export const DashboardCard: typeof import("../app/components/card/DashboardCard.vue")['default']
export const EmployeeCard: typeof import("../app/components/card/EmployeeCard.vue")['default']
export const OrderCard: typeof import("../app/components/card/OrderCard.vue")['default']
export const ProductCard: typeof import("../app/components/card/ProductCard.vue")['default']
export const BaseInput: typeof import("../app/components/input/BaseInput.vue")['default']
export const BaseSelect: typeof import("../app/components/input/BaseSelect.vue")['default']
export const Sidebar: typeof import("../app/components/layout/Sidebar.vue")['default']
export const RightSide: typeof import("../app/components/layout/dashboard/RightSide.vue")['default']
export const CustomerModal: typeof import("../app/components/modal/CustomerModal.vue")['default']
export const EmployeeModal: typeof import("../app/components/modal/EmployeeModal.vue")['default']
export const ProductModal: typeof import("../app/components/modal/ProductModal.vue")['default']
export const CustomerTable: typeof import("../app/components/table/CustomerTable.vue")['default']
export const EmployeeTable: typeof import("../app/components/table/EmployeeTable.vue")['default']
export const OrderTable: typeof import("../app/components/table/OrderTable.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const NuxtPicture: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const LazyUserProfile: LazyComponent<typeof import("../app/components/UserProfile.vue")['default']>
export const LazyAddButton: LazyComponent<typeof import("../app/components/button/AddButton.vue")['default']>
export const LazyBaseCard: LazyComponent<typeof import("../app/components/card/BaseCard.vue")['default']>
export const LazyDashboardCard: LazyComponent<typeof import("../app/components/card/DashboardCard.vue")['default']>
export const LazyEmployeeCard: LazyComponent<typeof import("../app/components/card/EmployeeCard.vue")['default']>
export const LazyOrderCard: LazyComponent<typeof import("../app/components/card/OrderCard.vue")['default']>
export const LazyProductCard: LazyComponent<typeof import("../app/components/card/ProductCard.vue")['default']>
export const LazyBaseInput: LazyComponent<typeof import("../app/components/input/BaseInput.vue")['default']>
export const LazyBaseSelect: LazyComponent<typeof import("../app/components/input/BaseSelect.vue")['default']>
export const LazySidebar: LazyComponent<typeof import("../app/components/layout/Sidebar.vue")['default']>
export const LazyRightSide: LazyComponent<typeof import("../app/components/layout/dashboard/RightSide.vue")['default']>
export const LazyCustomerModal: LazyComponent<typeof import("../app/components/modal/CustomerModal.vue")['default']>
export const LazyEmployeeModal: LazyComponent<typeof import("../app/components/modal/EmployeeModal.vue")['default']>
export const LazyProductModal: LazyComponent<typeof import("../app/components/modal/ProductModal.vue")['default']>
export const LazyCustomerTable: LazyComponent<typeof import("../app/components/table/CustomerTable.vue")['default']>
export const LazyEmployeeTable: LazyComponent<typeof import("../app/components/table/EmployeeTable.vue")['default']>
export const LazyOrderTable: LazyComponent<typeof import("../app/components/table/OrderTable.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>

export const componentNames: string[]
