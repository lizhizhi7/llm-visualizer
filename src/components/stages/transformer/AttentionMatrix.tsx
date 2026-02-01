import { useRef, useEffect, useMemo } from 'react';
import * as d3 from 'd3';
import type { Token } from '../../../types';
import { useVisualizationStore } from '../../../store/visualizationStore';

interface AttentionMatrixProps {
  weights: number[][];
  tokens: Token[];
}

export function AttentionMatrix({ weights, tokens }: AttentionMatrixProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { attentionThreshold, selectedToken, update } = useVisualizationStore();

  const displayTokens = useMemo(() => tokens.slice(0, 15), [tokens]);
  const displayWeights = useMemo(
    () => weights.slice(0, 15).map((row) => row.slice(0, 15)),
    [weights]
  );

  useEffect(() => {
    if (!svgRef.current || displayWeights.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 60, right: 20, bottom: 20, left: 60 };
    const width = 400;
    const height = 400;
    const cellSize = Math.min(
      (width - margin.left - margin.right) / displayTokens.length,
      (height - margin.top - margin.bottom) / displayTokens.length
    );

    const g = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const colorScale = d3
      .scaleSequential(d3.interpolateViridis)
      .domain([0, 1]);

    displayWeights.forEach((row, i) => {
      row.forEach((weight, j) => {
        if (j > i) return;

        const opacity = weight >= attentionThreshold ? 1 : 0.2;

        g.append('rect')
          .attr('x', j * cellSize)
          .attr('y', i * cellSize)
          .attr('width', cellSize - 1)
          .attr('height', cellSize - 1)
          .attr('fill', colorScale(weight))
          .attr('opacity', opacity)
          .attr('rx', 2)
          .style('cursor', 'pointer')
          .on('mouseover', function () {
            d3.select(this).attr('stroke', 'white').attr('stroke-width', 2);
          })
          .on('mouseout', function () {
            d3.select(this).attr('stroke', 'none');
          })
          .on('click', () => {
            update({ selectedToken: selectedToken === i ? null : i });
          })
          .append('title')
          .text(
            `${displayTokens[i]?.text || i} → ${displayTokens[j]?.text || j}: ${weight.toFixed(3)}`
          );
      });
    });

    displayTokens.forEach((token, i) => {
      g.append('text')
        .attr('x', i * cellSize + cellSize / 2)
        .attr('y', -10)
        .attr('text-anchor', 'middle')
        .attr('fill', '#94a3b8')
        .attr('font-size', '10px')
        .attr('font-family', 'monospace')
        .text(token.text === ' ' ? '␣' : token.text.slice(0, 4));

      g.append('text')
        .attr('x', -10)
        .attr('y', i * cellSize + cellSize / 2)
        .attr('text-anchor', 'end')
        .attr('dominant-baseline', 'middle')
        .attr('fill', '#94a3b8')
        .attr('font-size', '10px')
        .attr('font-family', 'monospace')
        .text(token.text === ' ' ? '␣' : token.text.slice(0, 4));
    });

    const legendWidth = 150;
    const legendHeight = 10;
    const legendG = svg
      .append('g')
      .attr('transform', `translate(${width - legendWidth - margin.right}, 20)`);

    const gradient = svg
      .append('defs')
      .append('linearGradient')
      .attr('id', 'attention-gradient')
      .attr('x1', '0%')
      .attr('x2', '100%');

    gradient.append('stop').attr('offset', '0%').attr('stop-color', colorScale(0));
    gradient.append('stop').attr('offset', '100%').attr('stop-color', colorScale(1));

    legendG
      .append('rect')
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .attr('fill', 'url(#attention-gradient)')
      .attr('rx', 2);

    legendG
      .append('text')
      .attr('x', 0)
      .attr('y', legendHeight + 12)
      .attr('fill', '#94a3b8')
      .attr('font-size', '9px')
      .text('0');

    legendG
      .append('text')
      .attr('x', legendWidth)
      .attr('y', legendHeight + 12)
      .attr('text-anchor', 'end')
      .attr('fill', '#94a3b8')
      .attr('font-size', '9px')
      .text('1');

    legendG
      .append('text')
      .attr('x', legendWidth / 2)
      .attr('y', -5)
      .attr('text-anchor', 'middle')
      .attr('fill', '#94a3b8')
      .attr('font-size', '10px')
      .text('Attention Weight');
  }, [displayWeights, displayTokens, attentionThreshold, selectedToken, update]);

  return (
    <div className="flex flex-col items-center">
      <svg ref={svgRef} />
      {tokens.length > 15 && (
        <div className="text-sm text-slate-500 mt-2">
          Showing first 15x15 of {tokens.length}x{tokens.length} matrix
        </div>
      )}
      <div className="mt-2 text-xs text-slate-500">
        Row = query token, Column = key token (causal masking applied)
      </div>
    </div>
  );
}
