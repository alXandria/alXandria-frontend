export function getMenu() {
  return [
    // VB:REPLACE-START:MENU-CONFIG
    {
      title: 'About AlXandria',
      key: 'dashboard',
      url: '/dashboard',
      icon: 'fe fe-home',
    },
    // VB:REPLACE-END:MENU-CONFIG
  ]
}

export default { getMenu }
