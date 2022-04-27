//Testdaten
const DUMMY_DATA2 = [
    { id: 'd1', value: 1, region: '1' },
    { id: 'd2', value: 2, region: '2' },
    { id: 'd3', value: 3, region: '3' },
    { id: 'd4', value: 4, region: '4' },
    { id: 'd5', value: 5, region: '5' },
    { id: 'd6', value: 1, region: '6' },
    { id: 'd7', value: 2, region: '7' },
    { id: 'd8', value: 3, region: '8' },
    { id: 'd9', value: 4, region: '9' },
    { id: 'd10', value: 35, region: '10' },
    { id: 'd11', value: 2, region: '11' },
    { id: 'd12', value: 1, region: '12' },
];

// Rand für Zahlen an der y-achse
const margins = {top: 20, bottom: 10};
// Container Größe des Diagramms
const chart_width = 600;
const chart_height = 400 - margins.top - margins.bottom;
//Säulen Attribute x-achse
const x = d3
    .scaleBand()
    .rangeRound([0, chart_width])
    .padding(0.1);
//Säulen Attribute y-achse
const y = d3
    .scaleLinear()
    .range([chart_height, 0]);
//Diagramm Container
const chartCointainer = d3
    .select('svg')
    .attr('width', chart_width)
    .attr('height', chart_height + margins.top + margins.bottom);
//Wertebereich einer Säule
x.domain(DUMMY_DATA2.map((data) => data.region));
y.domain([0, d3.max(DUMMY_DATA2, (data) => data.value) + 3]);
//Append an G, ist ein svg-element
const chart = chartCointainer.append('g');

//Linie an der X-Achse  
chart
    .append('g')
    .call(d3.axisBottom(x).tickSizeOuter(0))
    .attr('transform', `translate(0, ${chart_height})`)
    .attr('color', '#4f009e');
//Zuweisung zum bar-element+attribute
chart
    .selectAll('.bar')
    .data(DUMMY_DATA2)
    .enter()
    .append('rect')
    .classed('bar', true)
    .attr('width', x.bandwidth())
    .attr('height', (data) => chart_height - y(data.value))
    .attr('x', (data) => x(data.region))
    .attr('y', (data) => y(data.value));
// Zahlen über der Säule
chart
    .selectAll('.label')
    .data(DUMMY_DATA2)
    .enter()
    .append('text')
    .text((data) => data.value)
    .attr('x', (data) => x(data.region) + x.bandwidth() / 2)
    .attr('y', (data) => y(data.value) - 5)
    .attr('text-anchor', 'middle')
    .classed('label', true);