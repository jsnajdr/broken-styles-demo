## How to break your style modules with insufficient specificity


### How to run the app

You need to run the production app that actually extracts styles to `*.css` files. Development
version uses `style-loader` that adds inline `<style>` tags, and never adds them twice.

```
yarn install
yarn build
npx serve build
```

### How to reproduce issues

1. Click the "Load Reader" button. It should show Reader UI in blue colors. The red color
   from the `.card` rule is overridden by the blue color `.is-reader` rule.
2. Click the "Load Stats" button. It should show Stats UI in green. Now, however, we have an
   unwanted side effect: the Reader UI turns red! That's because the `stats` chunk contains
   a duplicate definition of the `.card` rule, which overrides the earlier `.is-reader` one.

Clicking on "Load Stats" first and "Load Reader" second, the UI will be broken in a similar
way: the already loaded Stats UI will turn red.

If you look at the dynamic chunks and their CSS assets, you will see that the `reader` chunk
ships code from the `card` and `reader` modules, and the `reader.chunk.css` file contains:
```css
.card{color:red}.is-reader{color:#00f}
```

The `stats` chunk ships code from the `card` (again) and `stats` modules, and the `stats.chunk.css`
file contains:
```css
.card{color:red}.is-stats{color:green}
```

It's the duplicate definition of `.card` that causes style breakage. Sometimes, if there's
enough shared code between the `reader` and `stats` chunks, webpack's chunk splitting optimization
will create a shared chunk with the `Card` code, and the problem will disappear. But this is
not at all guaranteed. Webpack can deoptimize and re-optimize these things at any time.
