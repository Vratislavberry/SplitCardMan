import { createContext, useState, useEffect } from "react";

import FetchHelper from "../../fetch-helper.js";

export const SplitCardListContext = createContext();

function SplitCardListProvider({ children, id }) {
  const [splitCardListDto, setSplitCardListDto] = useState({
    state: "ready", // one of ready/pending/error
    data: null,
    error: null,
  });

  async function handleLoad(dtoIn) {
    setSplitCardListDto((current) => {
      return { ...current, state: "pending" };
    });
    const result = await FetchHelper.splitCard.listByGroupId(dtoIn);
    setSplitCardListDto((current) => {
      if (result.ok) {
        return { ...current, state: "ready", data: result.data, error: null };
      } else {
        return { ...current, state: "error", error: result.data };
      }
    });
  }

  // to launch load on visiting the Child component (groupDetail)
  useEffect(() => {
    handleLoad({"groupId": id});
  }, []);

  async function handleCreate(dtoIn) {
    setSplitCardListDto((current) => {
      return { ...current, state: "pending" };
    });
    const result = await FetchHelper.splitCard.create(dtoIn);
    setSplitCardListDto((current) => {
      if (result.ok) {
        current.data.itemList.push(result.data);
        // returns deep copy of current
        return {
          ...current, // Keeps all existing properties
          state: "ready", // Updates the state property
          // Updates the data property
          data: { ...current.data, itemList: current.data.itemList.slice() },
          error: null, // Resets the error property
        };
      } else {
        return { ...current, state: "error", error: result.data };
      }
    });
    return { ok: result.ok, error: result.ok ? undefined : result.data };
  }

  /*
  async function handleUpdate(dtoIn) {
    setGroupListDto((current) => {
      return { ...current, state: "pending", pendingId: dtoIn.id };
    });
    const result = await FetchHelper.transaction.update(dtoIn);
    setGroupListDto((current) => {
      if (result.ok) {
        const itemIndex = current.data.itemList.findIndex(
          (item) => item.id === dtoIn.id
        );
        current.data.itemList[itemIndex] = dtoIn;
        return {
          ...current,
          state: "ready",
          data: { ...current.data, itemList: current.data.itemList.slice() },
          error: null,
          pendingId: undefined,
        };
      } else {
        return {
          ...current,
          state: "error",
          error: result.data,
          pendingId: undefined,
        };
      }
    });
    return { ok: result.ok, error: result.ok ? undefined : result.data };
  }

  async function handleDelete(dtoIn) {
    setGroupListDto((current) => {
      return { ...current, state: "pending", pendingId: dtoIn.id };
    });
    const result = await FetchHelper.transaction.delete(dtoIn);
    setGroupListDto((current) => {
      if (result.ok) {
        const itemIndex = current.data.itemList.findIndex(
          (item) => item.id === dtoIn.id
        );
        current.data.itemList.splice(itemIndex, 1);
        return {
          ...current,
          state: "ready",
          data: { ...current.data, itemList: current.data.itemList.slice() },
          error: null,
        };
      } else {
        return { ...current, state: "error", error: result.data };
      }
    });
    return { ok: result.ok, error: result.ok ? undefined : result.data };
  }
*/

  const value = {
    ...splitCardListDto,
    handlerMap: { handleLoad, handleCreate },
  };

  //console.log(splitCardListDto);
  return (
    <SplitCardListContext.Provider value={value}>
      {children}
    </SplitCardListContext.Provider>
  );
}

export default SplitCardListProvider;
