import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  checkInStatus: 'idle', // idle, pending, completed
  checkOutStatus: 'idle',
  checkInTime: null,
  checkOutTime: null,
  error: null,
};

// Async action for check-in
export const checkIn = createAsyncThunk('attendance/checkIn', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('http://localhost:5000/attendance/checkin', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return rejectWithValue(data.message);
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Async action for check-out
export const checkOut = createAsyncThunk('attendance/checkOut', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('http://localhost:5000/attendance/checkout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return rejectWithValue(data.message);
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Attendance slice
const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkIn.pending, (state) => {
        state.checkInStatus = 'pending';
      })
      .addCase(checkIn.fulfilled, (state, action) => {
        state.checkInStatus = 'completed';
        state.checkInTime = action.payload.checkInTime;
      })
      .addCase(checkIn.rejected, (state, action) => {
        state.checkInStatus = 'idle';
        state.error = action.payload;
      })
      .addCase(checkOut.pending, (state) => {
        state.checkOutStatus = 'pending';
      })
      .addCase(checkOut.fulfilled, (state, action) => {
        state.checkOutStatus = 'completed';
        state.checkOutTime = action.payload.checkOutTime;
      })
      .addCase(checkOut.rejected, (state, action) => {
        state.checkOutStatus = 'idle';
        state.error = action.payload;
      });
  },
});

export default attendanceSlice.reducer;
