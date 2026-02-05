import { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import type { ColorPalette } from '../data/types';
import { buildKitchenConstellation } from '../data/ingredientTaxonomy';
import type { KitchenIngredient, VisualType } from '../data/ingredientTaxonomy';

interface IngredientBubblesProps {
  keyIngredients: string[];
  spicesAndSeasonings: string[];
  colors: ColorPalette;
}

interface SimNode extends d3.SimulationNodeDatum, KitchenIngredient {}

interface SimLink extends d3.SimulationLinkDatum<SimNode> {
  source: SimNode | string;
  target: SimNode | string;
}

// Emoji icons for kitchen items
const kitchenEmojis: Record<VisualType, string> = {
  spice: '🥣',
  basket: '🥓',
  vegetable: '🌾',
  herb: '🌿',
  grain: '🍚',
  bottle: '🍶',
};

export function IngredientBubbles({
  keyIngredients,
  spicesAndSeasonings,
  colors,
}: IngredientBubblesProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    content: string;
    type: string;
  }>({ visible: false, x: 0, y: 0, content: '', type: '' });

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    // Build constellation data
    const { nodes: rawNodes, links: rawLinks } = buildKitchenConstellation(
      keyIngredients,
      spicesAndSeasonings
    );

    if (rawNodes.length === 0) return;

    // Get container dimensions
    const containerRect = containerRef.current.getBoundingClientRect();
    const width = containerRect.width;
    const height = Math.min(containerRect.height - 20, 260);

    // Create simulation nodes and links
    const nodes: SimNode[] = rawNodes.map(n => ({ ...n }));
    const nodeMap = new Map(nodes.map(n => [n.id, n]));

    const links: SimLink[] = rawLinks
      .filter(l => nodeMap.has(l.source) && nodeMap.has(l.target))
      .map(l => ({
        source: l.source,
        target: l.target,
      }));

    // Create force simulation
    const simulation = d3.forceSimulation<SimNode>(nodes)
      .force('link', d3.forceLink<SimNode, SimLink>(links)
        .id(d => d.id)
        .distance(60)
        .strength(0.3))
      .force('charge', d3.forceManyBody().strength(-80))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide<SimNode>().radius(d => d.isSignature ? 32 : 22))
      .force('x', d3.forceX(width / 2).strength(0.05))
      .force('y', d3.forceY(height / 2).strength(0.05));

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height].join(' '));

    // Draw links (constellation lines)
    const linkGroup = svg.append('g')
      .attr('class', 'links');

    const linkElements = linkGroup.selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', `${colors.primary}30`)
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '3,3');

    // Draw nodes (kitchen items)
    const nodeGroup = svg.append('g')
      .attr('class', 'nodes');

    const nodeElements = nodeGroup.selectAll('g')
      .data(nodes)
      .join('g')
      .style('cursor', 'pointer');

    // Add emoji icons
    nodeElements.append('text')
      .attr('class', 'emoji')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .attr('font-size', d => d.isSignature ? 28 : 18)
      .style('cursor', 'pointer')
      .text(d => kitchenEmojis[d.visualType]);

    // Add labels
    nodeElements.append('text')
      .attr('class', 'label')
      .attr('text-anchor', 'middle')
      .attr('dy', d => (d.isSignature ? 28 : 18) / 2 + 14)
      .attr('fill', colors.text)
      .attr('font-size', d => d.isSignature ? 9 : 7)
      .attr('font-weight', d => d.isSignature ? '500' : '400')
      .text(d => {
        const maxLen = d.isSignature ? 12 : 8;
        return d.name.length > maxLen ? d.name.slice(0, maxLen) + '…' : d.name;
      });

    // Hover effects
    nodeElements.on('mouseenter', function(event, d) {
      d3.select(this).select('.emoji')
        .attr('font-size', d.isSignature ? 32 : 22);

      // Highlight connected links
      linkElements
        .attr('stroke', l => {
          const src = typeof l.source === 'object' ? l.source.id : l.source;
          const tgt = typeof l.target === 'object' ? l.target.id : l.target;
          return (src === d.id || tgt === d.id) ? `${colors.primary}80` : `${colors.primary}30`;
        })
        .attr('stroke-width', l => {
          const src = typeof l.source === 'object' ? l.source.id : l.source;
          const tgt = typeof l.target === 'object' ? l.target.id : l.target;
          return (src === d.id || tgt === d.id) ? 2 : 1;
        });

      const containerRect = containerRef.current?.getBoundingClientRect();
      if (containerRect) {
        const typeLabels: Record<VisualType, string> = {
          spice: 'Spice',
          basket: 'Protein',
          vegetable: 'Vegetable',
          herb: 'Herb',
          grain: 'Starch',
          bottle: 'Sauce',
        };
        setTooltip({
          visible: true,
          x: event.clientX - containerRect.left,
          y: event.clientY - containerRect.top - 10,
          content: d.name,
          type: typeLabels[d.visualType],
        });
      }
    });

    nodeElements.on('mousemove', function(event) {
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (containerRect) {
        setTooltip(prev => ({
          ...prev,
          x: event.clientX - containerRect.left,
          y: event.clientY - containerRect.top - 10,
        }));
      }
    });

    nodeElements.on('mouseleave', function(_, d) {
      d3.select(this).select('.emoji')
        .attr('font-size', d.isSignature ? 28 : 18);

      linkElements
        .attr('stroke', `${colors.primary}30`)
        .attr('stroke-width', 1);

      setTooltip(prev => ({ ...prev, visible: false }));
    });

    // Update positions on simulation tick
    simulation.on('tick', () => {
      linkElements
        .attr('x1', d => (d.source as SimNode).x || 0)
        .attr('y1', d => (d.source as SimNode).y || 0)
        .attr('x2', d => (d.target as SimNode).x || 0)
        .attr('y2', d => (d.target as SimNode).y || 0);

      nodeElements.attr('transform', d => {
        // Keep nodes within bounds
        const padding = 30;
        d.x = Math.max(padding, Math.min(width - padding, d.x || 0));
        d.y = Math.max(padding, Math.min(height - padding, d.y || 0));
        return `translate(${d.x},${d.y})`;
      });
    });

    // Run simulation
    simulation.alpha(1).restart();

    // Cleanup
    return () => {
      simulation.stop();
    };
  }, [keyIngredients, spicesAndSeasonings, colors]);

  return (
    <div ref={containerRef} className="relative w-full h-64 md:h-72">
      <svg ref={svgRef} className="w-full h-full" />

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="absolute pointer-events-none z-10 rounded-lg shadow-lg px-3 py-2 border"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translate(-50%, -100%)',
            backgroundColor: colors.background,
            borderColor: `${colors.primary}40`,
          }}
        >
          <p className="font-medium text-sm" style={{ color: colors.primary }}>
            {tooltip.content}
          </p>
          <p className="text-xs text-gray-500">{tooltip.type}</p>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-wrap justify-center gap-3 text-xs text-gray-500">
        <span className="flex items-center gap-0.5">
          <span>🥣</span> Spices
        </span>
        <span className="flex items-center gap-0.5">
          <span>🌿</span> Herbs
        </span>
        <span className="flex items-center gap-0.5">
          <span>🥓</span> Proteins
        </span>
        <span className="flex items-center gap-0.5">
          <span>🌾</span> Vegetables
        </span>
        <span className="flex items-center gap-0.5">
          <span>🍚</span> Starches
        </span>
      </div>
    </div>
  );
}
