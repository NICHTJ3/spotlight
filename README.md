# Spotlight

## What
This project was created as a proof of concept for MacOS `Spotlight` like
functionality in any app. The idea behind it is you could fuzzy search all
ActionButtons on a page as well as some global actions that exist on all pages
and interact with them indirectly

<img width="893" alt="Screen Shot 2021-09-23 at 2 10 46 PM" src="https://user-images.githubusercontent.com/39316919/134445215-1d0aa9c7-a18c-42ab-8c79-8952f0fec6fa.png">


## What I might change retrospectively if I was ever to use it in an actual project

1. I would probably change the way the opening and closing works (how the
   keybinding to open spotlight works) to something similar to [this](https://www.npmjs.com/package/spotlight-react)
2. Pass keybindings like [this](https://craig.is/killing/mice)
3. I would also probably allow ActionButtons to have there own keybindings
   (shortcuts) with tooltips in the Spotlight menu similar to [this](https://github.com/saharmor/react-super-cmd)

## Remaining issues

1. Up and down navigation also changes cursor position in the query field
