import { GraphCanvas, GraphEdge, GraphNode } from "reagraph";
import { toast } from "react-toastify";
import { QuoteResponse, TokensResponse } from "../../types/responses";

interface RouteProps {
  data: QuoteResponse;
  tokens: TokensResponse;
}

const RouteData = ({ data, tokens }: RouteProps) => {
  const nodes: Array<GraphNode> = [];
  const edges: Array<GraphEdge> = [];

  nodes.push({
    id: `start-route`,
    label: data.fromToken?.symbol,
  });
  nodes.push({
    id: `end-route`,
    label: data.toToken?.symbol,
  });

  data.protocols?.forEach((route, routeIndex) => {
    route.forEach((step, stepIndex) => {
      if (stepIndex !== route.length - 1) {
        const token = tokens[step[0].toTokenAddress];
        nodes.push({
          id: `route-${routeIndex}-step-${stepIndex}`,
          label: token?.symbol || step[0].toTokenAddress,
        });
      }

      const label = step
        .reduce(
          (
            acc: string,
            item: {
              name: string;
              part: number;
              fromTokenAddress: string;
              toTokenAddress: string;
            }
          ) => {
            return acc + item.part + "% -> `" + item.name + "`, ";
          },
          ""
        )
        .slice(0, -2);

      edges.push({
        id: `route-${routeIndex}-edge-${stepIndex}`,
        source:
          stepIndex === 0
            ? `start-route`
            : `route-${routeIndex}-step-${stepIndex - 1}`,
        target:
          stepIndex === route.length - 1
            ? "end-route"
            : `route-${routeIndex}-step-${stepIndex}`,
        label,
        size: 3,
      });
    });
  });

  return (
    <>
      <GraphCanvas
        nodes={nodes}
        edges={edges}
        onEdgeClick={(e) => {
          toast(e.label);
        }}
        layoutType="hierarchicalLr"
        labelType="nodes"
        draggable
      />
    </>
  );
};

export default RouteData;
