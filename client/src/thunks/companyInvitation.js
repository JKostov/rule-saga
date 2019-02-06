
import { getCompanyInvitation as getCompanyInvitationAction } from '../reducers/companyInvitation';
import { getCompanyInvitation as getCompanyInvitationApi } from '../api/inviteUser';


export function getCompanyInvitation(token) {
  return dispatch => getCompanyInvitationApi(token)
    .then(({ data: { data } }) => {
      dispatch(getCompanyInvitationAction(data));
    });
}
