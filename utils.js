function getSortObject(orderBy = "id", order = "asc") {
  return { [orderBy]: order === "desc" ? -1 : 1 };
}

module.exports = { getSortObject };
