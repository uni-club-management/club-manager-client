import React from "react";
import { useParams } from "react-router-dom";
import { ClubContext } from "../../../context";
import { useQuery } from "@tanstack/react-query";
import { ClubDetails } from "../../../types";
import axios from "axios";
import {
  Card,
  Flex,
} from "antd";
import ClubDetailsCard from "./components/clubDetails";
import BarChart from "./components/barChart";

type Props = {};

const Dashboard = (props: Props) => {
  const { clubId } = useParams();
  const club = React.useContext(ClubContext);
  const idClub = (clubId && +clubId) ?? club.clubId ?? 0;
  const isMobile :boolean = window.innerWidth < 768;


  const clubDetails = useQuery<ClubDetails, Error>({
    queryKey: ["clubDetails", idClub],
    queryFn: () =>
      axios
        .get(`http://localhost:8080/api/v1/clubs/${2}/details`)
        .then((res) => res.data),
  });

  

  return (
    <Flex vertical gap="middle" >
      <ClubDetailsCard clubDetails={clubDetails} isMobile={isMobile} />

      <Flex wrap="wrap">
          <BarChart idClub={idClub }/>
      </Flex>
    </Flex>

  );
};

export default Dashboard;
