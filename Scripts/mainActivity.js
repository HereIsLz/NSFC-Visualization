var ScaleRatio = document.body.clientWidth / 1536;
d3.select("#VisualizationCanvas")
    .attr('width', 1520 * ScaleRatio)
    .attr('height', 730 * ScaleRatio)
window.onresize = function () {
    var ScaleRatio = document.body.clientWidth / 1536;
    d3.select("#VisualizationCanvas")
        .attr('width', 1520 * ScaleRatio)
        .attr('height', 730 * ScaleRatio)
}
const accentColor = '#EEEEEE'
const backGroundColor = '#030227'
const colorSet = ['rgb(255, 152, 0)', 'rgb(255, 87, 34)',
    'rgb(255, 235, 59)', 'rgb(255, 193, 7)',
    'rgb(139, 195, 74)', 'rgb(205, 220, 57)',
    'rgb(0, 150, 136)', 'rgb(76, 175, 80)',
    'rgb(3, 169, 244)', 'rgb(0, 188, 212)',
    'rgb(99, 121, 201)', 'rgb(33, 150, 243)',
    'rgb(166, 70, 186)', 'rgb(103, 58, 183)',
    "rgb(247, 77, 64)", 'rgb(233, 30, 99)', '#f3f3f3', '#f3f3f3']

const DepartmentName = ["数理科学部", "化学科学部", "生命科学部", "地球科学部", "工程与材料", "信息科学部", "管理科学部", "医学科学部", "全学部"]

var LayoutConfig = {
    Instance: {
        x: 50,
        y: 118,
        Height: 4,
        Width: 24,
        Step: 80,
    },
    MainChart: {
        x: 52,
        y: 220,
        LineStep: 44,
        SpannedStep: 60,
        ScaleFactor: 280,
    },
    SubChart: {
        get x() {
            /*if (document.documentElement.clientWidth <= 960) {
                 return 52
                 }*/
            return 900
        },
        get y() {
            /*if (document.documentElement.clientWidth <= 960) {
                 return 900
                 }*/
            return 68
        },
        barStep: 12,
        BarHeight: 170,
        BaselineY: 40,
        ScaleFactor: 600,
        GraphWidth: 560,
        BarOffsetY: 80,
        renderBorder: false,
    },
    Map: {
        x: 900,
        y: 370,
        instanceWidth: 24,
        instanceHeight: 12,
        toolTipReplacementx: -380,
        toolTipReplacementy: -200,
        toolTipWidth: 370,
        toolTipHeight: 180,
    }
}
var themeConfig = {
    subColorAlpha: 0.6,
    minAlpha: 0.2,
}

function accumulate(d) {
    var new_array = [0];
    d.reduce(function (a, b, i) { return new_array[i + 1] = a + b; }, 0);
    return new_array;
}
function toPercent(d) { return (Math.round(d * 10000) / 100).toFixed(2) + '%'; }
var VisualizationCanvas = d3.select("#VisualizationCanvas");


VisualizationCanvas.append("text")
    .text('学科申请与资助统计 (万元)').attr('fill', accentColor)
    .attr('class', 'chartTitle')
    .attr('transform', 'translate(' + (LayoutConfig.MainChart.x - 2) + ',' + (LayoutConfig.MainChart.y - 12) + ')')
var MainChartExample = VisualizationCanvas.append('g')
    .attr('transform', 'translate(' + (LayoutConfig.MainChart.x + 218) + ',' + (LayoutConfig.MainChart.y + 100) + ')')

MainChartExample.append("text")
    .text('申请金额').attr('fill', accentColor)
    .attr('transform', 'translate(' + (350) + ',' + (-10) + ')')
MainChartExample.append("rect")
    .attr('width', LayoutConfig.Instance.Width)
    .attr('height', LayoutConfig.Instance.Height * 3)
    .attr('transform', 'translate(' + (320) + ',' + (- 21) + ')')
    .attr('fill', accentColor)
    .attr('class', 'stripefilter0')
MainChartExample.append("text")
    .text('申请项目').attr('fill', accentColor)
    .attr('transform', 'translate(' + (350) + ',' + 13 + ')')
MainChartExample.append("circle")
    .attr('r', 8).attr('cx', 12).attr('cy', 6)
    .attr('transform', 'translate(' + (320) + ',' + 2 + ')')
    .attr('fill', accentColor)
    .classed('stripefilter1', true)

MainChartExample.append("text")
    .text('批准金额').attr('fill', accentColor)
    .attr('transform', 'translate(' + (450) + ',' + (-10) + ')')
MainChartExample.append("rect")
    .attr('width', LayoutConfig.Instance.Width)
    .attr('height', LayoutConfig.Instance.Height * 3)
    .attr('transform', 'translate(' + (420) + ',' + (-21) + ')')
    .attr('fill', accentColor)

MainChartExample.append("text")
    .text('批准项目').attr('fill', accentColor)
    .attr('transform', 'translate(' + (450) + ',' + 13 + ')')
MainChartExample.append("circle")
    .attr('r', 8).attr('cx', 12).attr('cy', 6)
    .attr('transform', 'translate(' + (420) + ',' + 2 + ')')
    .attr('fill', accentColor)

VisualizationCanvas.append("text")
    .text('按地区 (万元)').attr('fill', accentColor)
    .attr('class', 'chartTitle')
    .attr('transform', 'translate(' + LayoutConfig.Map.x + ',' + LayoutConfig.Map.y + ')')
VisualizationCanvas.append("text")
    .text('按单位 (万元)').attr('fill', accentColor)
    .attr('class', 'chartTitle')
    .attr('transform', 'translate(' + LayoutConfig.SubChart.x + ',' + LayoutConfig.SubChart.y + ')')
var instancePromise = VisualizationCanvas.append("g")
    .attr('transform', 'translate(' + (LayoutConfig.Instance.x + 2) + ',' + (LayoutConfig.Instance.y + 12) + ')')

instancePromise.selectAll("rect")
    .data([0, 1, 2, 3, 4, 5, 6, 7, 8])
    .enter().append('rect')
    .attr('transform', function (d, i) { return 'translate(' + (LayoutConfig.Instance.Step * i) + ',' + 0 + ')' })
    .attr('fill', function (d, i) { return colorSet[i * 2] })
    .attr('height', LayoutConfig.Instance.Height)
    .attr('width', LayoutConfig.Instance.Width)
instancePromise.selectAll("text")
    .data([0, 1, 2, 3, 4, 5, 6, 7, 8])
    .enter().append('text').attr('fill', accentColor)
    .attr('transform', function (d, i) {
        return 'translate(' + (LayoutConfig.Instance.Step * i - 1) + ',' + 24 + ')'
    })
    .text(function (d, i) { return DepartmentName[i] })
    .attr('fill', accentColor)
    .attr('opacity', themeConfig.subColorAlpha)


d3.select('.PageTitle').attr('transform', 'translate(' + 50 + ',' + 40 + ')');
var mapProjection = d3.geoMercator([720, 480]).center([132, 30]).scale(440);
var mapPath = d3.geoPath().projection(mapProjection);

var featureMap;
var ChinaMap = d3.json("Data/byArea.json")
    .then(function (json) {
        featureMap = json.features;
        return VisualizationCanvas.append("g")
            .attr('id', 'China_Map_GeometryContainer')
            .attr('transform', 'translate(' + LayoutConfig.Map.x + ',' + LayoutConfig.Map.y + ')')
            .selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", mapPath)
            .attr('stroke', backGroundColor)
            .attr('stroke-width', 1.2)
            .attr('id', function (t) { return 'region_' + t.id })
            .on('mouseover', function (k, t) {
                createMapToolTip(k.properties.name, k.data_byArea.TotalM, k.data_byArea.TotalN, k, accentColor, LayoutConfig.Map.toolTipWidth, LayoutConfig.Map.toolTipHeight,
                    LayoutConfig.Map.x + mapProjection(k.properties.cp)[0] + LayoutConfig.Map.toolTipReplacementx,
                    LayoutConfig.Map.y + mapProjection(k.properties.cp)[1] + LayoutConfig.Map.toolTipReplacementy)
            })
            .on('mouseout', function (k, t) {

                d3.select('#toolTipGeo').remove();
            })
            .attr('fill', accentColor)
            .attr('opacity', function (d, i) {
                var _opacity;
                var tmpVal = [];

                _opacity = d.data_byArea.TotalM;
                featureMap.forEach(function (d, i) {
                    tmpVal[i] = d.data_byArea.TotalM;
                })
                var maxiumVal = Math.max.apply(null, tmpVal);
                return Math.sqrt(Math.cbrt((4 + _opacity) / (4 + maxiumVal)));
            })
    })

var ordinalAxies = [0, 1, 2, 3, 4, 5, 6];
ordinalAxies.forEach(function (d, i) {
    VisualizationCanvas.append('rect')
        .attr('id', 'MapColorAxies' + i)
        .attr('stroke', backGroundColor)
        .attr('stroke-width', '1.2px')
        .attr('transform',
            'translate(' + (LayoutConfig.Map.x + 558) +
            ',' + (270 + LayoutConfig.Map.y + i * (LayoutConfig.Map.instanceHeight)) + ')')
})
var ordinalAxiesText = VisualizationCanvas.append('text').attr('id', 'colorAxiesText')
    .attr('opacity', themeConfig.subColorAlpha).attr('fill', accentColor)
    .attr('transform', 'translate(' + (LayoutConfig.Map.x + 554) +
        ',' + (276 + LayoutConfig.Map.y) + ')').attr('text-anchor', 'end')
var ordinalAxiesText = VisualizationCanvas.append('text')
    .attr('opacity', themeConfig.subColorAlpha).text('0').attr('fill', accentColor)
    .attr('transform', 'translate(' + (LayoutConfig.Map.x + 554) +
        ',' + (359 + LayoutConfig.Map.y) + ')').attr('text-anchor', 'end')
function renderMapColorAxies(maxVal, color = accentColor) {
    d3.select('#colorAxiesText').text(maxVal)
    ordinalAxies.forEach(function (d, i) {
        d3.select('#MapColorAxies' + i)
            .attr('width', LayoutConfig.Map.instanceWidth)
            .attr('height', LayoutConfig.Map.instanceHeight)
            .attr('fill', color)
            .attr('opacity', ((200 + (1 - i / 6) * maxVal) / (10 + maxVal)))
    })
}
renderMapColorAxies(60000)
var SubChartData = []
var Stack_SumBudgets = []
var SubChartReplacement = [0, 462, 575]
var SubChartAnchor = ['start', 'middle', 'middle']
var SubChart_Promise = d3.json("Data/byOrg.json").then(function (json) {
    var SumBudgets = [json.Budgets[0].Sum, json.Budgets[1].Sum, json.Budgets[2].Sum]
    Stack_SumBudgets = accumulate(SumBudgets)
    var SubChartCanvas = VisualizationCanvas.append("g")
        .attr('transform', 'translate(' + LayoutConfig.SubChart.x + ',' + LayoutConfig.SubChart.y + ')')
    json.Budgets.forEach(function (d, i) {
        SubChartData[i] = d;
        SubChartCanvas.append('text').text(d.Sum).attr('fill', accentColor)
            .attr('id', 'SubChartNumber' + i)
            .attr('transform', 'translate(' + SubChartReplacement[i] + ',' + 46 + ')')
            .attr('font-size', '36px')
            .attr('font-family', 'ProductSans-Bold')
            .attr('text-anchor', SubChartAnchor[i])
        SubChartCanvas.append('text')
            .text(d.Name + ' ' + toPercent(d.Sum / Stack_SumBudgets[Stack_SumBudgets.length - 1])).attr('fill', accentColor)
            .attr('id', 'SubChartNumberPercent' + i).attr('transform', 'translate(' + SubChartReplacement[i] + ',' + 68 + ')')
            .attr('opacity', themeConfig.subColorAlpha)
            .attr('text-anchor', SubChartAnchor[i])
    })

    SubChartCanvas.selectAll('g')
        .data(json.Budgets)
        .enter()
        .append('g')
        .attr('class', 'subChart_Section')
        .attr('transform', function (d, i) {
            var lengthLayout = [d.Math, d.Chemistry, d.Biology, d.EarthScience, d.Engineering, d.CS, d.Managing, d.Med];
            var stackLayout = accumulate(lengthLayout);
            d3.select(this)
                .selectAll('rect')
                .data(lengthLayout)
                .enter()
                .append('rect')
                .attr('class', function (k, t) {
                    return 'subChart_Section_Department' + t
                })
                .attr('height', function (k, j) {
                    return LayoutConfig.SubChart.BarHeight * k / d.Sum
                })
                .attr('width', function () {
                    return SumBudgets[i] / Stack_SumBudgets[3] * LayoutConfig.SubChart.GraphWidth
                })
                .attr('fill', function (k, t) {
                    return colorSet[t * 2]
                })
                .attr('stroke', backGroundColor)
                .attr('stroke-width', function () { if (!LayoutConfig.SubChart.renderBorder) return '0'; return '1.2px' })
                .attr('y', function (k, j) {
                    return stackLayout[j] * LayoutConfig.SubChart.BarHeight / d.Sum
                }
                )
                .on('mouseover', function (k, t) {
                    HighlightSubChart(t)
                    HighlightMap(t)
                })
                .on('mouseout', function (k, t) {
                    HighlightSubChart(t, true)
                    HighlightMap(t, true)
                })
            return 'translate(' + (Stack_SumBudgets[i] / Stack_SumBudgets[3] * LayoutConfig.SubChart.GraphWidth + i * LayoutConfig.SubChart.barStep) + ',' + LayoutConfig.SubChart.BarOffsetY + ')'
        })

})
var ProjectCircles_Approved = []
var ProjectCircles = []

var MainChart_Promise = d3.json("Data/byDepartment.json").then(function (json) {
    var stack_byMoney = [0];
    var stack_byProject = [];
    var stack_byProject_Approved = [];
    json.forEach(function (t, i) {
        stack_byMoney[i] = t.map(function (d) {
            return d.SumM
        })
        stack_byMoney[i] = accumulate(stack_byMoney[i])

        stack_byProject[i] = t.map(function (d) {
            return d.SumN
        })
        stack_byProject_Approved[i] = t.map(function (d) {
            return d.ApprovedN
        })
        stack_byProject[i] = accumulate(stack_byProject[i])
        ProjectCircles[i] = stack_byProject[i][stack_byProject[i].length - 1]
        stack_byProject_Approved[i] = accumulate(stack_byProject_Approved[i])
        ProjectCircles_Approved[i] = stack_byProject_Approved[i][stack_byProject_Approved[i].length - 1]
    })

    var ChartCanvas = VisualizationCanvas.append("g")
        .attr('class', 'mainBarChart')
        .attr('transform', 'translate(' + LayoutConfig.MainChart.x + ',' + LayoutConfig.MainChart.y + ')')
    var AxiesStep = [0, 30000, 60000, 90000, 120000, 150000, 180000, 210000]
    ChartCanvas.selectAll('rect')
        .data(AxiesStep)
        .enter()
        .append('rect')
        .attr('class', 'barChar_Axies')
        .attr('width', 1.6)
        .attr('height', 12 + LayoutConfig.MainChart.SpannedStep * 8)
        .attr('fill', accentColor)
        .attr('opacity', themeConfig.minAlpha)
        .attr('transform', function (d, i) {
            return 'translate(' + (d / LayoutConfig.MainChart.ScaleFactor) + ',' + 30 + ')'
        })

    ChartCanvas.selectAll('text')
        .data(AxiesStep)
        .enter()
        .append('text').attr('fill', accentColor)
        .attr('class', 'barChar_Axies_text')
        .attr('opacity', themeConfig.subColorAlpha)
        .attr('text-anchor', 'middle')
        .attr('transform', function (d, i) {
            return 'translate(' + (0 + d / LayoutConfig.MainChart.ScaleFactor) + ',' + 20 + ')'
        })
        .text(function (d) { return d })
    var ChartBar = ChartCanvas.selectAll('g')
        .data(json)
        .enter()
        .append('g')
        .attr('class', 'departmentBar')
        .attr('transform', function (d, i) {
            return 'translate(' + 0 + ',' + (42 + i * LayoutConfig.MainChart.SpannedStep) + ')'
        })
    var SubChartBar = ChartBar.selectAll('rect')
        .data(function (d, i) { return d })
        .enter()
        .append('g')
        .attr('transform', function (d, i) {
            return 'translate(' + (stack_byMoney[d.Department][i] / LayoutConfig.MainChart.ScaleFactor) + ',' + 0 + ')'
        })
    SubChartBar.append('rect')
        .classed('WidthTransitionAnimationToFull', true)
        .attr('y', function (d) { return (1 - d.ApprovedM / d.SumM) * LayoutConfig.MainChart.LineStep })
        .attr('width', function (d) {
            return d.SumM / LayoutConfig.MainChart.ScaleFactor
        })
        .attr('height', function (d) {
            return d.ApprovedM / d.SumM * LayoutConfig.MainChart.LineStep
        })
        .attr('fill', function (d, i) {
            return colorSet[d.Department * 2]
        })
        .attr('stroke', backGroundColor)
        .attr('stroke-width', '1.2px')
    SubChartBar.append('rect')
        .attr('class', function (d, i) {
            return 'WidthTransitionAnimationToFull stripefilter' + 0;
        })
        .attr('fill', function (d, i) {
            return colorSet[d.Department * 2]
        })
        .attr('height', LayoutConfig.MainChart.LineStep)
        .attr('width', function (d) {
            return d.SumM / LayoutConfig.MainChart.ScaleFactor
        })
        .attr('stroke', backGroundColor)
        .attr('stroke-width', '1.2px')
    SubChartBar.append('rect')
        .attr('fill', backGroundColor)
        .attr('class', 'MainChartBarSection')
        .attr('name', 'MainChartBarMouseEventHandler')
        .attr('id', function (d, i) { return 'MainChartBarMouseEventHandler' + d.Department + i })
        .attr('height', LayoutConfig.MainChart.LineStep)
        .attr('width', function (d) {
            return d.SumM / LayoutConfig.MainChart.ScaleFactor
        })
        .attr('opacity', 0)
        .attr('stroke', backGroundColor)
        .attr('stroke-width', '1.2px')
        .on('mouseover', function (d, i) {
            d3.selectAll(".MainChartBarSection").filter(function (t, i) {
                if (t.Department == d.Department && t.Subject == d.Subject)
                    return false
                return true
            })
                .classed('OpacityTransitionAnimationToHalf', true)//.attr('opacity', themeConfig.subColorAlpha)
            HighlightSubChart(d.Department);
            HighlightMap(d.Department);
            createToolTip(d.Subject, '' + d.ApprovedM, '' + d.SumM, '' + d.ApprovedN, '' + d.SumN,
                borderColor = colorSet[d.Department * 2], width = 240, height = 156,
                x = LayoutConfig.MainChart.x + (stack_byMoney[d.Department][i] / LayoutConfig.MainChart.ScaleFactor) + 1,
                y = LayoutConfig.MainChart.y + LayoutConfig.MainChart.SpannedStep * (d.Department - 1) - 60);
        })
        .on('mouseout', function (d, i) {
            HighlightSubChart(d.Department, true);
            d3.selectAll(".MainChartBarSection")
                .classed('OpacityTransitionAnimationToHalf', false)
            d3.select('#toolTipGeo').remove()
            HighlightMap(0, true)
        })

    var AppendedArcs = d3.select('.mainBarChart')
        .append('g').attr('id', 'MainChart_AppendedArc')
    var circleScaleFactor = 36;
    ProjectCircles.forEach(function (d, i) {
        AppendedArcs.append('rect')
            .attr('height', '1.4px')
            .attr('fill', colorSet[i * 2])
            .attr('width', (790 - stack_byMoney[i][stack_byMoney[i].length - 1] / LayoutConfig.MainChart.ScaleFactor))
            .attr('transform', 'translate(' + stack_byMoney[i][stack_byMoney[i].length - 1] / LayoutConfig.MainChart.ScaleFactor + ',' + (LayoutConfig.MainChart.SpannedStep * i + 63.3) + ')')

        AppendedArcs.append('circle')
            .attr('stroke', colorSet[i * 2])
            .attr('stroke-width', '1.4px')
            .attr('fill', 'rgba(3,2,39,1)')
            .attr('cx', 790)
            .attr('cy', i * LayoutConfig.MainChart.SpannedStep + 64)
            .attr('r', d / circleScaleFactor)
        AppendedArcs.append('circle')
            .attr('fill', colorSet[i * 2])
            .classed('stripefilter1', true)
            .attr('cx', 790)
            .attr('cy', i * LayoutConfig.MainChart.SpannedStep + 64)
            .attr('r', d / circleScaleFactor)
    })

    ProjectCircles_Approved.forEach(function (d, i) {
        var Arc = d3.arc()
            .innerRadius(0)
            .outerRadius(ProjectCircles[i] / circleScaleFactor)
            .startAngle(0)
            .endAngle(Math.PI * 2 * (d / ProjectCircles[i]));
        AppendedArcs.append('path')
            .attr("d", Arc)
            .attr('fill', colorSet[i * 2])
            .attr('transform', 'translate(' + 790 + ',' + (i * LayoutConfig.MainChart.SpannedStep + 64) + ')')
        AppendedArcs.append('circle')
            .attr('fill', 'rgba(3,2,39,0)')
            .attr('cx', 790)
            .attr('cy', i * LayoutConfig.MainChart.SpannedStep + 64)
            .attr('r', ProjectCircles[i] / circleScaleFactor)
    })
})


function createToolTip(tipTitle, tipNumber, tipNumber2, tipNumber_2, tipNumber2_2, borderColor = '#ffffff', width = 100, height = 100, x = 0, y = 0) {
    d3.select('#toolTipGeo').remove()
    var _tipContainer = VisualizationCanvas.append('g').attr('id', 'toolTipGeo')
    var _tipRect = _tipContainer.append('rect').attr('id', 'toolTipContainer').attr('fill', accentColor)
    var _tipTitle = _tipContainer.append('text').attr('id', 'toolTipTitle').attr('fill', accentColor)
    var _tipTitle2 = _tipContainer.append('text').attr('id', 'toolTipTitle2').attr('fill', accentColor)
    var _tipTitle3 = _tipContainer.append('text').attr('id', 'toolTipTitle3').attr('fill', accentColor)
    var _tipNumber = _tipContainer.append('text').attr('id', 'toolTipNumber').attr('fill', accentColor)
    var _tipNumber2 = _tipContainer.append('text').attr('id', 'toolTipNumber2').attr('xml:space', "preserve").attr('fill', accentColor)
    var _tipNumber_2 = _tipContainer.append('text').attr('id', 'toolTipNumber_2').attr('fill', accentColor)
    var _tipNumber2_2 = _tipContainer.append('text').attr('id', 'toolTipNumber2_2').attr('xml:space', "preserve").attr('fill', accentColor)
    _tipContainer.attr('transform', 'translate(' + x + ',' + y + ')')
    _tipRect.attr('fill', backGroundColor)
        .attr('width', Math.max(width, tipTitle.length * 16))
        .attr('height', height)
        .attr('stroke', borderColor)
        .attr('stroke-width', '2px')
        .attr('opacity', 0.9)
    _tipTitle.text(tipTitle)
        //.attr('opacity', themeConfig.subColorAlpha)
        .attr('transform', 'translate(' + 12 + ',' + 22 + ')')
    _tipTitle2.text('金额 (万元)')
        .attr('opacity', themeConfig.subColorAlpha)
        .attr('transform', 'translate(' + 12 + ',' + 50 + ')')
    _tipNumber.text(tipNumber)
        .attr('transform', 'translate(' + 10 + ',' + 82 + ')')
        .attr('font-size', 32)
    _tipNumber2.text(' / ' + tipNumber2)
        .attr('transform', 'translate(' + (20 + tipNumber.length * 16.2) + ',' + 82 + ')')
    _tipTitle3.text('项目 (项)')
        .attr('opacity', themeConfig.subColorAlpha)
        .attr('transform', 'translate(' + 12 + ',' + 110 + ')')
    _tipNumber_2.text(tipNumber_2)
        .attr('transform', 'translate(' + 10 + ',' + 142 + ')')
        .attr('font-size', 32)
    _tipNumber2_2.text(' / ' + tipNumber2_2)
        .attr('transform', 'translate(' + (8 + tipNumber_2.length * 16.8) + ',' + 142 + ')')
}

function createMapToolTip(tipTitle, tipNumber, tipNumber_2, obj, borderColor = '#ffffff', width = 100, height = 100, x = 0, y = 0) {
    d3.select('#toolTipGeo').remove()
    var _tipContainer = VisualizationCanvas.append('g').attr('id', 'toolTipGeo')
    var _tipRect = _tipContainer.append('rect').attr('id', 'toolTipContainer').attr('fill', accentColor)
    var _tipTitle = _tipContainer.append('text').attr('id', 'toolTipTitle').attr('fill', accentColor)
    var _tipTitle2 = _tipContainer.append('text').attr('id', 'toolTipTitle2').attr('fill', accentColor)
    var _tipTitle3 = _tipContainer.append('text').attr('id', 'toolTipTitle3').attr('fill', accentColor)
    var _tipNumber = _tipContainer.append('text').attr('id', 'toolTipNumber').attr('fill', accentColor)
    var _tipNumber_2 = _tipContainer.append('text').attr('id', 'toolTipNumber_2').attr('fill', accentColor)
    _tipContainer.attr('transform', 'translate(' + x + ',' + y + ')')
    _tipRect.attr('fill', backGroundColor)
        .attr('width', Math.max(width, tipTitle.length * 16))
        .attr('height', height)
        .attr('stroke', borderColor)
        .attr('stroke-width', '2px')
        .attr('opacity', 0.9)
    _tipTitle.text(tipTitle)
        .attr('transform', 'translate(' + 12 + ',' + 22 + ')')
    _tipTitle2.text('金额 (万元)')
        .attr('opacity', themeConfig.subColorAlpha)
        .attr('transform', 'translate(' + 12 + ',' + 50 + ')')
    _tipNumber.text(tipNumber)
        .attr('transform', 'translate(' + 10 + ',' + 82 + ')')
        .attr('font-size', 32)
    _tipTitle3.text('项目 (项)')
        .attr('opacity', themeConfig.subColorAlpha)
        .attr('transform', 'translate(' + 12 + ',' + 110 + ')')
    _tipNumber_2.text(tipNumber_2)
        .attr('transform', 'translate(' + 10 + ',' + 142 + ')')
        .attr('font-size', 32)
    var _index = [0, 1, 2, 3, 4, 5, 6, 7]
    console.log(obj)
    var tmpVal = [obj.data_byArea.MathM, obj.data_byArea.ChemM, obj.data_byArea.BioM, obj.data_byArea.EarthM,
    obj.data_byArea.EngineM, obj.data_byArea.CsM, obj.data_byArea.ManageM, obj.data_byArea.MedM,];
    var _scaleFactor = 59
    _index.forEach(function (t, k) {
        _tipContainer
            .append('rect').attr('transform', 'translate(' + (100 + k * 32) + ',' + (LayoutConfig.Map.toolTipHeight - 1 - tmpVal[k] / _scaleFactor) + ')')
            .attr('width', 24)
            .attr('fill', colorSet[k * 2])
            .attr('id', '_mapToolTip' + k)
            .attr('height', tmpVal[k] / _scaleFactor)
    }
    )
}

function HighlightSubChart(index, rollback = false) {
    if (rollback) {
        d3.select('#MainChart_AppendedArc').classed('OpacityTransitionAnimationTo3', false)
        for (i = 0; i < 3; i++) {
            d3.selectAll('#SubChartNumberPercent' + i)
                .text(SubChartData[i].Name + ' ' + toPercent(SubChartData[i].Sum / Stack_SumBudgets[Stack_SumBudgets.length - 1]))
        }
        for (i = 0; i < 3; i++) {
            d3.selectAll('#SubChartNumber' + i)
                .text(SubChartData[i].Sum)
                .attr('fill', accentColor)
        }
        for (i = 0; i < 8; i++)
            d3.selectAll('.subChart_Section_Department' + i)
                .classed('OpacityTransitionAnimationTo3', false)
        return;
    }
    d3.select('#MainChart_AppendedArc').classed('OpacityTransitionAnimationTo3', true)
    for (i = 0; i < 3; i++) {
        d3.selectAll('#SubChartNumber' + i)
            .text(SubChartData[i].Serial[index])
            .attr('fill', colorSet[index * 2])
    }
    for (i = 0; i < 3; i++) {
        d3.selectAll('#SubChartNumberPercent' + i)
            .text(SubChartData[i].Name + ' ' + toPercent(SubChartData[i].Serial[index] / Stack_SumBudgets[Stack_SumBudgets.length - 1]))
    }
    for (i = 0; i < 8; i++) {
        if (i != index) {
            d3.selectAll('.subChart_Section_Department' + i)
                .classed('OpacityTransitionAnimationTo3', true)
        }
        else {
            d3.selectAll('.subChart_Section_Department' + i)
                .classed('OpacityTransitionAnimationTo3', false)
        }
    }
}

function HighlightMap(index, rollback = false) {
    if (rollback) {
        renderMapColorAxies(60000)
        for (i = 0; i < 34; i++) {
            d3.select('#region_' + featureMap[i].id)
                .attr('fill', accentColor)
                .attr('opacity', function () {
                    var _opacity;
                    var tmpVal = [];

                    _opacity = featureMap[i].data_byArea.TotalM;
                    featureMap.forEach(function (d, i) {
                        tmpVal[i] = d.data_byArea.TotalM;
                    })
                    var maxiumVal = Math.max.apply(null, tmpVal);
                    return Math.sqrt(Math.cbrt((4 + _opacity) / (4 + maxiumVal)));
                })
        }
        return;
    }
    var tmpVal = [];
    switch (index) {
        case 0:
            featureMap.forEach(function (d, i) {
                tmpVal[i] = d.data_byArea.MathM;
            })
            break;
        case 1:
            featureMap.forEach(function (d, i) {
                tmpVal[i] = d.data_byArea.ChemM;
            })
            break;
        case 2:
            featureMap.forEach(function (d, i) {
                tmpVal[i] = d.data_byArea.BioM;
            })
            break;
        case 3:
            featureMap.forEach(function (d, i) {
                tmpVal[i] = d.data_byArea.EarthM;
            })
            break;
        case 4:
            featureMap.forEach(function (d, i) {
                tmpVal[i] = d.data_byArea.EngineM;
            })
            break;
        case 5:
            featureMap.forEach(function (d, i) {
                tmpVal[i] = d.data_byArea.CsM;
            })
            break;
        case 6:
            featureMap.forEach(function (d, i) {
                tmpVal[i] = d.data_byArea.ManageM;
            })
            break;
        case 7:
            featureMap.forEach(function (d, i) {
                tmpVal[i] = d.data_byArea.MedM;
            })
            break;
    }
    var maxiumVal = Math.max.apply(null, tmpVal);
    renderMapColorAxies(maxiumVal, colorSet[index * 2])
    for (i = 0; i < 34; i++) {
        var _opacity;
        var tmpVal = [];
        switch (index) {
            case 0:
                _opacity = featureMap[i].data_byArea.MathM;
                break;
            case 1:
                _opacity = featureMap[i].data_byArea.ChemM;
                break;
            case 2:
                _opacity = featureMap[i].data_byArea.BioM;

                break;
            case 3:
                _opacity = featureMap[i].data_byArea.EarthM;
                break;
            case 4:
                _opacity = featureMap[i].data_byArea.EngineM;
                break;
            case 5:
                _opacity = featureMap[i].data_byArea.CsM;
                break;
            case 6:
                _opacity = featureMap[i].data_byArea.ManageM;
                break;
            case 7:
                _opacity = featureMap[i].data_byArea.MedM;
                break;
        }
        d3.select('#region_' + featureMap[i].id)
            .attr('fill', colorSet[index * 2])
            .attr('opacity', function () {

                return Math.sqrt(Math.sqrt((10 + _opacity) / (10 + maxiumVal)));
            })
    }
}
