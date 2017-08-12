const THEME_NAME = 'lychee-syntax'
const INDICATOR_SHOWN_KEY = 'modeIndicatorShown'

const camel = string => string.replace(/([.-])([a-z])/g, (_, $1, $2) =>
  $2.toUpperCase())

const config = {
  [INDICATOR_SHOWN_KEY]: {
    description: 'show a border indicating the current vim-mode-plus mode (and spacecase !)',
    type: 'boolean',
    default: true
  }
}

const activate = state =>
  atom.themes.onDidChangeActiveThemes(() => {
    const indicatorPath = `${THEME_NAME}.${INDICATOR_SHOWN_KEY}`
    const indicatorDataKey = camel(indicatorPath)

    const setIndicatorAttribute = () => {
      const indicatorShown = atom.config.get(indicatorPath)
      atom.workspace.element.dataset[indicatorDataKey] = indicatorShown
    }

    atom.config.onDidChange(indicatorPath, setIndicatorAttribute)

    setIndicatorAttribute()
  })

module.exports = {config, activate}
