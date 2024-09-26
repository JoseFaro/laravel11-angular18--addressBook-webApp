export const filterContacts = (searchFilter: string, contacts: any[] = []) => {
  return contacts.filter((contact) => {
    const fieldsMatches =
      contact.id.toString().includes(searchFilter) ||
      contact.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchFilter.toLowerCase()) ||
      contact.website.toLowerCase().includes(searchFilter.toLowerCase()) ||
      contact.notes.toLowerCase().includes(searchFilter.toLowerCase());

    const addressMatches = contact.addresses.some((address: any) =>
      address.address.toLowerCase().includes(searchFilter.toLowerCase())
    );

    const emailMatches = contact.emails.some((email: any) =>
      email.email.toLowerCase().includes(searchFilter.toLowerCase())
    );

    const phoneMatches = contact.phones.some((phone: any) =>
      phone.phone.includes(searchFilter)
    );

    return fieldsMatches || addressMatches || phoneMatches || emailMatches;
  });
};
