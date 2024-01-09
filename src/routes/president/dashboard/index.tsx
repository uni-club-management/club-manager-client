import React from "react";
import { useParams } from "react-router-dom";
import { ClubContext } from "../../../context";
import { useQuery } from "@tanstack/react-query";
import { ClubDetails } from "../../../types";
import axios from "axios";
import {
  Flex,
} from "antd";
import ClubDetailsCard from "./components/clubDetails";

type Props = {};

const Dashboard = (props: Props) => {
  const { clubId } = useParams();
  const club = React.useContext(ClubContext);
  const idClub = (clubId && +clubId) ?? club.clubId ?? 0;

  const clubDetails = useQuery<ClubDetails, Error>({
    queryKey: ["clubDetails", idClub],
    queryFn: () =>
      axios
        .get(`http://localhost:8080/api/v1/clubs/${2}/details`)
        .then((res) => res.data),
  });
  const isMobile :boolean = window.innerWidth < 768;
  return (
    <Flex vertical gap={"16px"}>
      <ClubDetailsCard clubDetails={clubDetails} isMobile={isMobile} />
    </Flex>

  );
};

export default Dashboard;
