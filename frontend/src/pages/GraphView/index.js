import { Grid, useTheme } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import {
  addGraphAPI,
  getGraphDataByIDAPI,
  updateGraphAPI,
} from "../../api/graphs";
import { LineGraphComponent } from "../../components/LineGraphComponent";
import { LOCAL_CONSTANTS } from "../../constants";
import { useFormik } from "formik";
import { GraphBuilderForm } from "../../components/GraphBuilderForm";
import { GraphBuilderPreview } from "../../components/GraphBuilderPreview";
import { displayError, displaySuccess } from "../../utils/notification";
import { useParams } from "react-router-dom";

const GraphView = () => {
  const theme = useTheme();
  const { id } = useParams();
  const {
    isLoading: isLoadingGraphData,
    data: graphData,
    error: loadGraphDataError,
    refetch: refetchGraphData,
  } = useQuery({
    queryKey: [`REACT_QUERY_KEY_GRAPH`, id],
    queryFn: () => getGraphDataByIDAPI({ graphID: id }),
    cacheTime: 0,
    retry: 1,
    staleTime: Infinity,
  });
  const {
    isPending: isUpdatingGraph,
    isSuccess: isUpdatingGraphSuccess,
    isError: isUpdatingGraphError,
    error: updateGraphError,
    mutate: updateGraph,
  } = useMutation({
    mutationFn: ({ data }) => {
      return updateGraphAPI({ data });
    },
    retry: false,
    onSuccess: () => {
      displaySuccess("Submitted graph successfully");
      refetchGraphData();
    },
    onError: (error) => {
      displayError(error);
    },
  });
  const graphForm = useFormik({
    initialValues: {
      graph_type: LOCAL_CONSTANTS.GRAPH_TYPES.BAR.value,
      legend_enabled: true,
      legend_position: LOCAL_CONSTANTS.GRAPH_LEGEND_POSITION.TOP,
      graph_title: "",
      x_axis: "",
      y_axis: "",
      query_array: [{ dataset_title: "", query: "" }],
    },
    validateOnMount: false,
    validateOnChange: false,
    validate: (values) => {
      const errors = {};

      return errors;
    },
    onSubmit: (values) => {
      const { graph_title, ...graph_options } = values;
      updateGraph({
        data: { graph_id: graphData?.pm_graph_id, graph_title, graph_options },
      });
    },
  });

  useEffect(() => {
    if (graphData) {
      graphForm.setFieldValue("graph_type", graphData.graph_options.graph_type);
      graphForm.setFieldValue(
        "legend_enabled",
        graphData.graph_options.legend_enabled
      );
      graphForm.setFieldValue(
        "legend_position",
        graphData.graph_options.legend_position
      );
      graphForm.setFieldValue("graph_title", graphData.title);
      graphForm.setFieldValue("x_axis", graphData.graph_options.x_axis);
      graphForm.setFieldValue("y_axis", graphData.graph_options.y_axis);
      graphForm.setFieldValue(
        "query_array",
        graphData.graph_options.query_array
      );
    }
  }, [graphData]);

  return (
    <div className="w-full">
      <Grid container spacing={1} className="!px-3">
        <Grid item lg={5} md={4} className="w-full">
          <GraphBuilderForm isLoading={isUpdatingGraph} graphForm={graphForm} />
        </Grid>
        {graphData && (
          <Grid item lg={7} md={8} className="w-full">
            <GraphBuilderPreview
              graphType={graphForm.values["graph_type"]}
              legendPosition={graphForm.values["legend_position"]}
              legendDisplay={graphForm.values["legend_enabled"]}
              graphTitle={graphForm.values["graph_title"]}
              data={graphData.dataset}
            />
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default GraphView;
