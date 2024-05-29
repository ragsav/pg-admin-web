const { prisma } = require("../../config/prisma");
const constants = require("../../constants");
const { extractError } = require("../../utils/error.utils");
const Logger = require("../../utils/logger");
const { GraphService } = require("../services/graph.services");
const graphController = {};

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns
 */
graphController.addGraph = async (req, res) => {
  try {
    const { pmUser, state, body } = req;
    const pm_user_id = parseInt(pmUser.pm_user_id);

    Logger.log("info", {
      message: "graphController:addGraph:params",
      params: { pm_user_id, body },
    });

    const newGraph = await GraphService.addGraph({
      title: body.graph_title,
      graphOptions: body.graph_options,
    });

    Logger.log("success", {
      message: "graphController:addGraph:success",
      params: { pm_user_id, newGraph },
    });

    return res.json({
      success: true,
      row: newGraph,
    });
  } catch (error) {
    Logger.log("error", {
      message: "graphController:addGraph:catch-1",
      params: { error },
    });
    return res.json({ success: false, error: extractError(error) });
  }
};

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns
 */
graphController.updateGraph = async (req, res) => {
  try {
    const { pmUser, state, body } = req;
    const pm_user_id = parseInt(pmUser.pm_user_id);
    const authorized_graphs = state.authorized_graphs;

    Logger.log("info", {
      message: "graphController:updateGraph:params",
      params: { pm_user_id, body },
    });

    const updatedGraph = await GraphService.updateGraph({
      graphID: parseInt(body.graph_id),
      title: body.graph_title,
      graphOptions: body.graph_options,
      authorizedGraphs: authorized_graphs,
    });

    Logger.log("success", {
      message: "graphController:updateGraph:success",
      params: { pm_user_id, updatedGraph },
    });

    return res.json({
      success: true,
      graph: updatedGraph,
    });
  } catch (error) {
    Logger.log("error", {
      message: "graphController:updateGraph:catch-1",
      params: { error },
    });
    return res.json({ success: false, error: extractError(error) });
  }
};

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns
 */
graphController.getGraphData = async (req, res) => {
  try {
    const { pmUser, state, params } = req;
    const pm_user_id = parseInt(pmUser.pm_user_id);
    const graph_id = parseInt(params.id);
    const authorized_graphs = state.authorized_graphs;

    Logger.log("info", {
      message: "graphController:getGraphData:params",
      params: { pm_user_id, graph_id },
    });

    const graph = await GraphService.getGraphData({
      graphID: graph_id,
      authorizedGraphs: authorized_graphs,
    });

    Logger.log("success", {
      message: "graphController:getGraphData:success",
      params: { pm_user_id, graph },
    });

    return res.json({
      success: true,
      graph: graph,
    });
  } catch (error) {
    Logger.log("error", {
      message: "graphController:getGraphData:catch-1",
      params: { error },
    });
    return res.json({ success: false, error: extractError(error) });
  }
};

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns
 */
graphController.getAllGraphs = async (req, res) => {
  try {
    const { pmUser, state, params } = req;
    const pm_user_id = parseInt(pmUser.pm_user_id);
    const authorized_graphs = state.authorized_graphs;

    Logger.log("info", {
      message: "graphController:getAllGraphs:params",
      params: { pm_user_id },
    });

    const graphs = await GraphService.getAllGraphs({
      authorizedGraphs: authorized_graphs,
    });

    Logger.log("success", {
      message: "graphController:getAllGraphs:success",
      params: { pm_user_id, graphs },
    });

    return res.json({
      success: true,
      graphs: graphs,
    });
  } catch (error) {
    Logger.log("error", {
      message: "graphController:getAllGraphs:catch-1",
      params: { error },
    });
    return res.json({ success: false, error: extractError(error) });
  }
};

module.exports = { graphController };
