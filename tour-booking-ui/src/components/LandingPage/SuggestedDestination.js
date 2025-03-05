import React, { useEffect, useState } from "react";
import { getPagePlaces } from "../../api/PublicApi";
import CardImgDestination from "./CardImgDestination";
const SuggestedDestination = () => {
  const [placesList, setPlacesList] = useState([]);

  useEffect(() => {
    const fetchPlaceList = async () => {
      const tmpPlaces = await getPagePlaces(0, 8);
      if (tmpPlaces != null) setPlacesList(tmpPlaces.content);
    };
    fetchPlaceList();
  }, []);

  return (
    <div className="mt-5">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-4 mt-3">
        {placesList &&
          placesList.map((place, index) => (
            <div key={index} className="card-item">
              <CardImgDestination des={place} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default SuggestedDestination;
