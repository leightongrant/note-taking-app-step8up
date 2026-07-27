declare const bootstrap: {
  Modal: any
  Offcanvas: any
  Tooltip: any
  Popover: any
  Collapse: any
  Tab: any
  Toast: any
  Dropdown: any
}

declare namespace dateFns {
  function format(date: Date | number, formatStr: string): string
  function addDays(date: Date | number, amount: number): Date
  function parseISO(isoString: string): Date
  function formatDistanceToNowStrict(
    date: string | number | Date,
    options?: FormatDistanceToNowStrictOptions
  ): string
  // Add more as needed
}
