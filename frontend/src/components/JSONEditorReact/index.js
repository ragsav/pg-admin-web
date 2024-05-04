import React, { Component, useEffect, useRef, useState } from "react";
import isEqual from "lodash/isEqual";
import cloneDeep from "lodash/cloneDeep";

import JSONEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.css";

import "./style.css";
const modes = ["tree", "form", "view", "code", "text"];
export const JSONEditorReact = ({ json, onChange, label, mode = "code" }) => {
  const containerRef = useRef();

  const editorRef = useRef();

  const handleChange = () => {
    if (onChange && editorRef.current) {
      onChange(editorRef.current.get());
    }
  };

  useEffect(() => {
    if (containerRef.current != null) {
      if (editorRef.current != null) {
        editorRef.current.set(json);
        // editorRef.current.expandAll();
        if (mode) {
          editorRef.current.setMode(mode);
        }
      } else {
        editorRef.current = new JSONEditor(containerRef.current, {
          mode: mode,
          indentation: 4,
          onChange: handleChange,
          mainMenuBar: true,
          enableSort: true,
          theme: "dark",
        });
        editorRef.current.set(json);
        // editorRef.current.expandAll();
      }
    }
  }, [containerRef, json, mode]);

  useEffect(
    () => () => {
      editorRef.current?.destroy();
    },
    []
  );

  return (
    <div
      className="jsoneditor-react-container !h-1/2"
      style={{ height: 500 }}
      ref={containerRef}
    />
  );
};
