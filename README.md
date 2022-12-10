# My answers | Advent of Code 2022

I'll be posting here my [Advent of Code 2022](https://adventofcode.com/2022) answers as I first wrote them the first time.

> :warning: NOT CLEAN CODE & NOT EFICENT CODE. My goal is to code as fast as possible.

Run instructions:

```zsh
nvm install node
npm install

# Replace <day> and <part> with numbers
npx ts-node-dev --respawn ./src/challenges/<day>/<part>/index.ts

# Example
npx ts-node-dev --respawn ./src/challenges/1/1/index.ts
```

## Results

My username is `mauriciabad`

```txt
      --------Part 1--------   --------Part 2--------
Day       Time   Rank  Score       Time   Rank  Score
 10   00:38:12   7626      0   01:22:02   8360      0
  9   01:25:41  10640      0   02:05:01   8677      0
  8   01:03:03  10811      0   02:25:34  13674      0
  7   02:58:03  15363      0   03:08:47  14630      0
  6   00:14:26   8948      0   00:17:48   8745      0
  5   00:49:32   9692      0   00:53:53   8973      0
  4   00:21:30   9468      0   00:23:54   7965      0
  3   00:21:38   7799      0   00:41:52   9257      0
  2   00:20:05   8243      0   00:25:10   6520      0
  1   00:24:18   8917      0   00:29:50   8546      0
```

## Notes

### Day 7

I really spent 3h 8min, but started 17 mins late. (so actually 2h 51min)

I used this [Reddit comment](https://www.reddit.com/r/adventofcode/comments/zeu8qq/comment/iz8jj7j/?utm_source=share&utm_medium=web2x&context=3) to fix my code after 2h 40min.

### Day 8

I give up after 1h 37min. I did a break, and then I figured out what was wrong.

### Day 9

Learnings:

- have a paper and pen next to you
- throwing for out-of-bound cases was very useful
- It's just easier to test every individual case than to find patterns
- Install the debugger!
