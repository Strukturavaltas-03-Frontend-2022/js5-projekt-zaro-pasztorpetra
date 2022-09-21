
export const getData = (url) => {
  let fetchOptions = {
    method: "GET",
    mode: "cors",
    cache: "no-cache"
  };

  return fetch(url, fetchOptions).then(
    resp => resp.json(),
    err => console.error(err)
  );
};

//  const deleteUser = (id) => {
//   let fetchOptions = {
//     method: "DELETE",
//   };

//   return  fetch(`${apiUrl}/${id}`, fetchOptions).then(
//     resp => resp.json(),
//     err => console.error(err) ).then(
//       data => {
//         getUsers();
//       }
//     );
// }