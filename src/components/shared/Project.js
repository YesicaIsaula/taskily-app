import React from "react";
import { Dimensions, StyleSheet, View, Text } from "react-native";
import { Card, Caption } from "react-native-paper";
import { format } from "date-fns";

const { height, width } = Dimensions.get("screen");

function Project({ id, title, timestamp }) {
  function time(){
    if(timestamp.value <= Date.now){
     <Caption style={styles.retraso}>
        {format(timestamp, "eee H:mm")}
      </Caption>
    }else{
      <Caption style={styles.timestamp}>
        {format(timestamp, "eee H:mm")}
      </Caption>
    }
  }
  return (
    <Card style={styles.container}>
      <Card.Title title={title} />
      <Caption style={styles.timestamp}>
        {format(timestamp, "eee H:mm")}
      </Caption>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width * 0.45,
    height: height * 0.15,
    margin: 5,
  },
  timestamp: {
    alignSelf: "flex-end",
    marginRight: 15,
  },

  
  retraso: {
    color: "#ff0000"
  }
});

export default Project;
