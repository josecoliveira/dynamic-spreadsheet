# GovPredict Dynamic Spreadsheet Take-home Test

This is the documentation for my Dynamic Spreadsheet project for the GovPredict Take-home Test.

## How to run

This project was made with React and Redux. It was created using `create-react-app`. First, you need to install the required npm packages:

```bash
npm install
```

Then, you can start the development server at `localhost:3000` with

```bash
npm start
```

## Implementation

All JavaScript files are in `src/` folder structured as below

```plain
dynamic-spreadsheet/src/
├── actions/
├── api/
├── components/
├── constants/
├── reducers/
├── store/
├── App.js
└── index.js
```

All there are 4 components for rendering the spreadsheet located at `components\`.

- `DynamicSpreadsheet` renders the spreadsheet and it deals with operatons at the spreadsheet like add lines, add rows, clear and save. It cals `DSHead` and `DSRow`.
- `DSHead` renders the header row of the spreadsheet and it deals editing of the row names.
- `DSCell` renders a single cell of the spreasheet and deals with changes at the cell and validation.

The state of the spreadsheet is handled by Redux at `actions\`, `constants\action-types.js`, `reducers\` and `store\`.

You can implement a saving mechanism at `api\`

## Challenges

Even though I worked with React Native 2 years ago, I have learned some concepts about React that I should been now back then.

### Managing top level states

In this project, I learned about Redux, a state container for JavaScript app. When I was implementing the update of the cells content at `DSCell`, and my state storing the spreadsheet was at the top level component `DynamicSpreadsheet`, I realized that to propagate the update through the components. Then, I followed the recommmendation of the test and learn Redux.

The spreadsheet is the only information stored using Redux because is the top level informations that is updated by all components. I used [this tutorial](https://www.valentinog.com/blog/redux/#react-redux-tutorial-getting-to-know-the-redux-store) to implement it.

### Immutable states

While learning Redux, I also learned that states must be immutable and I needed to learn how to to it. At first, I was using the spread operator to reacreate the new objects and arrays, but since attributes and entries of the spreadsheet are nested objects and arrays, and I needed to change some cells by index, I needed to search for a better way to do that. I discovered a npm package, [`immer`](https://immerjs.github.io/immer/docs/introduction) that creates a new object or array with usual operations.

## Next Step

### Make the `DynamicSpreadsheet` independent

`DynamicSpreadsheet` should follow the single-responsability principle, that is, change states inside the component shouldn't change the state of the whole app. It is important, because the same component could be used at another aplications without major modifications.

The main challenge for this task is to implement Redux only for the component instead for the whole app. It also needs a function passed by props for persisting the spreadsheet.
