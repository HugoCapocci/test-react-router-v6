import {
    getContact,
} from "../contacts";

export async function contactLoader({ params }) {
    const contact = await getContact(params.contactId);
    if (!contact) {
      throw new Response("", {
        status: 404,
        statusText: "Not Found",
      });
    }
    return contact;
}
