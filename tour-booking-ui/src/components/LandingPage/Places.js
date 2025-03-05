import React, { useEffect, useState } from "react";
import { getPagePlaces } from "../../api/PublicApi";
import CardDestination from "./CardDestination";
const Places = () => {
  const [placesList, setPlacesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const handleNextPage = () => {
    setCurrentPage(
      currentPage + 1 < totalPages ? currentPage + 1 : currentPage
    );
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage > 0 ? currentPage - 1 : 0);
  };
  useEffect(() => {
    const fetchHotelList = async () => {
      const tmpHotels = await getPagePlaces(currentPage, 8);
      if (tmpHotels != null) {
        setPlacesList(tmpHotels.content);
        setTotalPages(tmpHotels.totalPages);
      }
    };
    fetchHotelList();
  }, [currentPage]);

  return (
    <main id="content" role="main" className="main">
      <div className="content container-fluid w-90">
        <div className="row justify-content-center ">
          <div className="col-lg-10">
            <h1 className="text-center">Điểm đến</h1>
            <div className="row mt-3">
              {/* thẻ hotel */}
              <div className="card-wrapper">
                {placesList.map((hotel, index) => (
                  <div key={`H${hotel.id}${index}`} className="card-item">
                    <CardDestination des={hotel} />
                  </div>
                ))}
              </div>
              {/* thẻ hotel */}
            </div>
          </div>
        </div>
        <div className="card-footer">
          {/* <!-- Pagination --> */}
          <div className="row justify-content-center justify-content-sm-between align-items-sm-center">
            <div className="col-sm-4 mb-2 mb-sm-0">
              <div className="d-flex justify-content-center justify-content-sm-start align-items-center">
                <span className="text-secondary mr-2">
                  <div
                    className="paginate_button previous page-link"
                    onClick={handlePrevPage}
                  >
                    <span aria-hidden="true">
                      <i className="tio-arrow-backward"></i> Trước
                    </span>
                  </div>
                </span>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="paginate_button page-link">
                <span>
                  {currentPage + 1} / {totalPages}
                </span>
              </div>
            </div>

            <div className="col-sm-4">
              <div className="d-flex justify-content-center justify-content-sm-end">
                {/* <!-- Pagination --> */}

                <div
                  className="dataTables_paginate paging_simple_numbers"
                  id="datatable_paginate"
                >
                  <div
                    className="paginate_button next page-link"
                    onClick={handleNextPage}
                  >
                    <span aria-hidden="true">
                      Sau <i className="tio-arrow-forward"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- End Pagination --> */}
        </div>
      </div>
    </main>
  );
};

export default Places;
