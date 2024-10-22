const API_URL = 'http://localhost:5000/api/';

export const getAllHabits = async () => {
  const response = await fetch(API_URL + "habits");
  if (!response.ok) {
    throw new Error(response.message || 'Failed to fetch habits.');
  }
  return response.json();
};

export const getHabit = async (id) => {
  const response = await fetch(API_URL + `habits/${id}`);
  if (!response.ok) {
    throw new Error(response.message || 'Failed to fetch habit.');
  }
  return response.json();
};

export const getAllAreas = async () => {
  const response = await fetch(API_URL + "areas");
  if (!response.ok) {
    throw new Error(response.message || 'Failed to fetch areas.');
  }
  return response.json();
};

export const postHabit = async (habit) => {
  const response = await fetch(API_URL + "habits", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(habit),
  });
  if (!response.ok) {
    throw new Error(response.message);
  }
  return response.json();
};

export const deleteHabit = async (habitId) => {
  const response = await fetch(`${API_URL}habits/${habitId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete habit: ' + response.statusText);
  }
  
  return response.json(); // Optionally return any response data if needed
};


export const postArea = async (area) => {
  const response = await fetch(API_URL + "areas", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(area),
  });
  if (!response.ok) {
    throw new Error(response.message);
  }
  return response.json();
};
