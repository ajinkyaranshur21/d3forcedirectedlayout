// import {forceSimulation,forceManyBody,forceLink,forceCenter} from 'd3';

d3.json("testdata.json").then(function(data){

    console.log(data)



const nodes= data.nodes

const links=data.links

const svg=d3.select('#container');
const width= +svg.attr('width');
const height= +svg.attr('height');
const repulsion=-200
centerx= width/2;
centery= height/2;

const simulation=d3.forceSimulation(nodes)
    .force('charge',d3.forceManyBody().strength(repulsion))
    .force('link',d3.forceLink(links).distance((links) => links.distance))
    .force('center',d3.forceCenter(centerx,centery));
    


const lines =svg
        .attr("stroke","#999")
        .attr("stroke-opacity",0.2)
    .selectAll('line')
    .data(links)
    .enter()
    .append('line');
        // .attr('stroke','black');


const circles =svg
        // .attr("stroke","#fff")
        .attr("stroke-width",1.5)
    .selectAll('circle')
    .data(nodes)
    .enter()
        .append('circle')
        .attr('fill',(node) => node.color || 'gray')
        .attr('r',10);


circles.call(d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended));

simulation.on('tick',() => {
    // console.log('tick');
    circles
        .attr('cx',(node) => node.x)
        .attr('cy',(node) => node.y);

    lines
        .attr('x1',(link) => link.source.x)
        .attr('y1',(link) => link.source.y)
        .attr('x2',(link) => link.target.x)
        .attr('y2',(link) => link.target.y)
}); 


  // Reheat the simulation when drag starts, and fix the subject position.
function dragstarted(event) {
if (!event.active) simulation.alphaTarget(0.3).restart();
event.subject.fx = event.subject.x;
event.subject.fy = event.subject.y;
}

// Update the subject (dragged node) position during drag.
function dragged(event) {
event.subject.fx = event.x;
event.subject.fy = event.y;
}

// Restore the target alpha so the simulation cools after dragging ends.
// Unfix the subject position now that it’s no longer being dragged.
function dragended(event) {
if (!event.active) simulation.alphaTarget(0);
event.subject.fx = null;
event.subject.fy = null;
}






});