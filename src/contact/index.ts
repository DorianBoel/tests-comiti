import { DAO } from "../shared/dao/DAO";
import { ContactDTO } from "./dto/ContactDTO";
import { Contact } from "./entities/Contact";
import { ContactMapper } from "./mappers/ContactMapper";

async function addContact(contact: ContactDTO): Promise<ContactDTO> {

    let dao: DAO<Contact, ContactDTO>;

    return DAO.loader<Contact, ContactDTO>(new ContactMapper())
        .then(d => dao = d)
        .then(() => dao.getMapper().toEntity(contact))
        .then((entity) => dao.save(entity))
        .catch((err: Error) => { throw err });
}

export default addContact;
