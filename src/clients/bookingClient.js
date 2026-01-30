export class BookingClient {
  constructor(publicRequest, authRequest) {
    this.publicRequest = publicRequest;
    this.authRequest = authRequest;
  }

  async ping() {
    return await this.publicRequest.get('/ping');
  }

  async createBooking(payload) {
    return await this.authRequest.post('/booking', { data: payload });
  }

  async getBookingById(id) {
    return await this.authRequest.get(`/booking/${id}`);
  }

  async getBooking(firstname, lastname) {
    const query = new URLSearchParams();
    if (firstname) query.append('firstname', firstname);
    if (lastname) query.append('lastname', lastname);
    return await this.publicRequest.get(`/booking?${query.toString()}`);
  }

  async updateBooking(id, payload) {
    return await this.authRequest.put(`/booking/${id}`, { data: payload });
  }

 async deleteBooking(id, token) {
        // ✅ pass token as Cookie
        return await this.publicRequest.delete(`/booking/${id}`, {
            headers: {
                Cookie: `token=${token}`
            }
        });
    }

}
