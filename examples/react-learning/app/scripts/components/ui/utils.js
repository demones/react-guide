function rowNumber(position, numberOfColumns) {
  return Math.floor(position / numberOfColumns);
}

function itemsThatFitHorizontally(style, itemStyle) {
  return Math.round(style.width / getItemWidth(itemStyle));
}

function getItemWidth(itemStyle) {
  return itemStyle.width + itemLeftMargin(itemStyle) + itemRightMargin(itemStyle);
}

function itemLeftMargin(itemStyle) {
  return (itemStyle.marginLeft || itemStyle.margin || 0);
}

function itemRightMargin(itemStyle) {
  return (itemStyle.marginLeft || itemStyle.margin || 0);
}

function itemTopMargin(itemStyle) {
  return (itemStyle.marginTop || itemStyle.margin || 0);
}

function itemBottomMargin(itemStyle) {
  return (itemStyle.marginBottom || itemStyle.margin || 0);
}

function isTopVisible(options) {
  const {style, position} = options;

  return position >= 0 && position <= style.height;
}

function isBottomVisible(options) {
  const {bottom, style} = options;

  return bottom >= 0 && bottom <= style.height;
}

export function columnPositions({style, itemStyle}) {
  const columnPositions = [];
  const numberOfColumns = itemsThatFitHorizontally(style, itemStyle);
  const width = getItemWidth(itemStyle);

  for (let i = 0; i < numberOfColumns; i++) {
    columnPositions.push(i * width);
  }

  return columnPositions;
}

export function rowPositions({columnCount, itemHeight, style, rowsCount, scrollPosition}) {
  const rowsHeight = rowsCount * itemHeight;
  const translation = scrollPosition - rowsHeight;

  const positions = [];
  let positionIndex = 0;

  let unpositionedListItems = true;

  while (unpositionedListItems) {
    const top =
      verticalStartingPosition(positionIndex, columnCount, itemHeight);

    const translatedPosition = translatePosition({
      top, itemHeight, style,
      amount: -translation
    });

    if (translatedPosition.topVisible || translatedPosition.bottomVisible) {
      positions[positionIndex] = translatedPosition;
      positionIndex++;
    } else {
      unpositionedListItems = false;
    }
  }

  return positions;
}

export function rowsThatFitIn({height, rowHeight}) {
  const rowsCount = Math.floor(height / rowHeight);
  return rowsCount > 0 ? rowsCount : 0
}

export function verticalStartingPosition(position, numberOfColumns, itemHeight) {
  return rowNumber(position, numberOfColumns) * itemHeight;
}

export function itemHeight(itemStyle) {
  return itemStyle.height + itemTopMargin(itemStyle) + itemBottomMargin(itemStyle);
}

export function translatePosition({style, top, itemHeight, amount}) {
  const newTop = top + amount;

  return {
    top: newTop,

    topVisible: isTopVisible({
      style,
      position: newTop
    }),

    bottomVisible: isBottomVisible({
      style,
      bottom: newTop + itemHeight
    })
  };
}