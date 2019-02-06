
import axios from '.';

export default function (companyId, email) {
  return axios.post(`/auth/${companyId}/invite-user`, {
    email,
  });
}

export function getCompanyInvitation(token) {
  return axios.post(`/auth/verify-invitation/${token}`);
}
