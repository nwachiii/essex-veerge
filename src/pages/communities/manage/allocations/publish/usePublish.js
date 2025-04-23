const usePublish = (mutation, unit_id, uploads) => {
  const allocationsType =
    typeof window !== 'undefined' &&
    localStorage &&
    JSON.parse(localStorage.getItem('allocations_type'));
  const allocationsMilestone =
    typeof window !== 'undefined' &&
    localStorage &&
    JSON.parse(localStorage.getItem('allocations_milestone'));
  const allocationsData =
    typeof window !== 'undefined' &&
    localStorage &&
    JSON.parse(localStorage.getItem('allocations_data'));
  const allocationsArchived =
    typeof window !== 'undefined' &&
    localStorage &&
    JSON.parse(localStorage.getItem('allocations_archived'));

  const handlePublish = () => {
   return mutation?.mutate({
      allocation_type: allocationsType || null,
      allocation_milestone: parseInt(allocationsMilestone) || null,
      unit: parseInt(unit_id),
      allocations: allocationsData || null,
      archived: allocationsArchived?.archived || [],
      photos: uploads,
    });
  };

  return { allocationsData, allocationsArchived, handlePublish };
};

export default usePublish