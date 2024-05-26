import React, { useState, useEffect, useRef } from "react";
import LocationItem from "./LocationItem";

import { useDispatch, useSelector } from "react-redux";
import { updatedLocationOrder } from "../../../../redux/tripSlice";

import { setDay, getLocationArray } from "../../../../redux/tripSlice";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TripItem = (props) => {
  const dispatch = useDispatch();
  const indexRedux = useSelector((state) => state.tripCreate.index);

  const ref = useRef();

  const data = props.data;
  const [getList, setGetList] = useState([]);

  const handleGetList = (day) => {
    const findDay = data.items.find((item) => item.day === day);
    if (findDay) {
      setGetList(findDay.locations);
    } else {
      console.error("No locations found for day:", day);
      setGetList([]);
    }
  };

  const formatDateTripList = (input) => {
    const date = new Date(input);
    const options = { month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const getDate = (day) => {
    dispatch(setDay(day));
    return props.active();
  };

  const handleOnDragEnd = (result) => {
    try {
      if (!result.destination) return; // Kiểm tra xem có destination không
      const items = Array.from(getList);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      dispatch(updatedLocationOrder(items));
      dispatch(getLocationArray(items[0].day));
    } catch (err) {
      console.error(err);
    }
  };

  // Scroll
  useEffect(() => {
    if (ref.current && indexRedux !== undefined) {
      if (data.items[indexRedux]?.locations.length >= 0) {
        ref.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [indexRedux]);

  // Click Map
  const handleGetLocationArray = (day) => {
    dispatch(getLocationArray(day));
  };

  return (
    <div className="my-8">
      {data.items.map((item, index) => {
        // const finDay = item.find((item) => item.day === 1)
        return (
          <div key={index} ref={index === indexRedux ? ref : null}>
            {item.locations.length === 0 ? (
              // Empty items
              <div
                className="mt-8 border-b border-b-slate-400 pb-8"
                onMouseOver={() => handleGetLocationArray(item.day)}
              >
                <div>
                  <h1 className="text-3xl font-bold">
                    {formatDateTripList(item.day)}
                  </h1>
                </div>
                <div className="mt-5 flex flex-col items-center">
                  <p className="text-base font-light text-slate-900">
                    Nothing saved yet!
                  </p>
                  <button
                    onClick={() => getDate(item.day)}
                    className="hover-bg-slate-900 hover-text-white mt-5 rounded-xl border border-slate-900 px-4 py-2"
                  >
                    Add items
                  </button>
                </div>
              </div>
            ) : (
              // Trip items
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId={String(item.day)}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      onMouseOver={() => handleGetLocationArray(item.day)}
                    >
                      <div>
                        <h1 className="mt-5 text-3xl font-bold">
                          {formatDateTripList(item.day)}
                        </h1>
                      </div>
                      <div className="mt-5 flex flex-col">
                        {item.locations.map((location, index) => (
                          <Draggable
                            key={location.id}
                            draggableId={`${location.id}-${index}`}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                onMouseDown={() => handleGetList(location.day)}
                              >
                                <LocationItem
                                  id={location.id}
                                  url={location.url}
                                  name={location.name}
                                  address={location.address}
                                  day={location.day}
                                  index={index}
                                  description={location.description}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                      </div>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                <button
                  onClick={() => getDate(item.day)}
                  className="mt-5 rounded-lg border border-slate-700 px-6 py-2 text-base font-semibold text-slate-800 hover:bg-slate-900 hover:text-white"
                >
                  + Add
                </button>
              </DragDropContext>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TripItem;
