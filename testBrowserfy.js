const polygonsIntersect = require('polygons-intersect')

chart.config.options.onHover = (e) => {
    var canvasPos = Chart.helpers.getRelativePosition(e, chart)
    var dataX = chart.scales.xAxis.getValueForPixel(canvasPos.x);
    var dataY = chart.scales.yAxis.getValueForPixel(canvasPos.y);
    var poly2 = [{ x: dataX, y: 0 }, { x: dataX, y: maxValue / 2 }, { x: dataX, y: maxValue }]
    var yIntersect = polygonsIntersect(poly1, poly2)[0].y
    chart.config.options.annotations.line1.xMax = dataX
    chart.config.options.annotations.line1.xMin = dataX
    chart.config.options.annotations.point1.xValue = dataX
    chart.config.options.annotations.point1.yValue = yIntersect
    chart.config.options.annotations.line1.label.content = [new Date(dataX).toString().slice(0, 24), "Portfolio value", ("$ " + (yIntersect.toFixed(2).toString()))]
    chart.update('none')

}
chart.update()