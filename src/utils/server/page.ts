export function isPageComponent(com: any): com is Page.Component {
  if (com && (com as any).Layout) {
    return true
  }
  return false
}
