using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using MegoKoraWebApi.Models;
namespace MegoKoraWebApi.Controllers
{
	[RoutePrefix("api/megoKora")]
	[EnableCors(origins: "*", headers: "*", methods: "*")]
	public class ClientController : ApiController
	{
		MegoContext db = new MegoContext();
		[Route("getClient")]
		//api/megoKora/getClient
		//get:displayData in client
		public List<Client> getAllClient()
		{
			return db.Client.ToList();
		}

		//get spacific client
		//api/megoKora/getClient/1
		[Route("getClient/{clientId}")]
		public Client getOneClient(int clientId)
		{
			Client client = db.Client.Find(clientId);
			if (client != null)
			{
				return client;
			}
			else
			{
				var msg = new HttpResponseMessage(HttpStatusCode.NotFound)
				{
					Content = new StringContent("this id:" + clientId.ToString() + " is not found in clients dataBase"),
					ReasonPhrase = "not found!!! this client to display",
				};
				throw new HttpResponseException(msg);
			}
		}

		[Route("postClient")]
		//api/megoKora/postClient
		//post: add new client in list
		public void postNewClient(Client newClient)
		{
			if (ModelState.IsValid)
			{
				db.Client.Add(newClient);
				db.SaveChanges();
			}
			else
			{
				var msg = new HttpResponseMessage(HttpStatusCode.BadRequest)
				{
					Content = new StringContent("model state is not valid"),
					ReasonPhrase = "model state is not valid",
				};
				throw new HttpResponseException(msg);
			}

		}

		[Route("putClient/{ClientID}")]
		//api/megoKora/putClient/1
		//put: update client using id
		public void putClient([FromUri] int ClientID, [FromBody]Client ClientAfterUpdateData)
		{
			Client currentClient = db.Client.Find(ClientID);
			if (currentClient != null)
			{
				currentClient.NationalityID = ClientAfterUpdateData.NationalityID;
				currentClient.FirstName = ClientAfterUpdateData.FirstName;
				currentClient.LastName = ClientAfterUpdateData.LastName;
				currentClient.Age = ClientAfterUpdateData.Age;
				currentClient.Gender = ClientAfterUpdateData.Gender;
				currentClient.Street = ClientAfterUpdateData.Street;
				currentClient.City = ClientAfterUpdateData.City;
				currentClient.Country = ClientAfterUpdateData.Country;
				currentClient.ClientPicture = ClientAfterUpdateData.ClientPicture;
				currentClient.Email = ClientAfterUpdateData.Email;
				currentClient.Password = ClientAfterUpdateData.Password;
				currentClient.Phone1 = ClientAfterUpdateData.Phone1;
				currentClient.Phone2 = ClientAfterUpdateData.Phone2;
				currentClient.Balance = ClientAfterUpdateData.Balance;
				db.SaveChanges();
			}
			else
			{
				var msg = new HttpResponseMessage(HttpStatusCode.NotFound)
				{
					Content = new StringContent("this id:" + ClientID.ToString() + " is not found in clients dataBase"),
					ReasonPhrase = "not found!!! this client to update",
				};
				throw new HttpResponseException(msg);
			}

		}

		[Route("deleteClient/{ClientID}")]
		//api/megoKora/deleteClient/1
		//delete: to remove client from list in DB
		public void deleteClient(int ClientID)
		{
			Client currentClient = db.Client.Find(ClientID);
			if (currentClient != null)
			{
				db.Client.Remove(currentClient);
				db.SaveChanges();
			}
			else
			{

				var msg = new HttpResponseMessage(HttpStatusCode.NotFound)
				{
					Content = new StringContent("this id:" + ClientID.ToString() + " is not found in clients dataBase"),
					ReasonPhrase = "not found!!! this client to delete",
				};
				throw new HttpResponseException(msg);

			}
		}

		//Get:login to account
		//api/megoKora/logIn/aa.yahoo.com/26762108
		[Route("logInClient/{email}/{password}")]
		public Client getLogin(string email, string password)
		{
			Client logInClient = db.Client.FirstOrDefault(c => c.Email == email && c.Password == password);
			if (logInClient != null)
			{
				return logInClient;
			}
			else
			{
				var msg = new HttpResponseMessage(HttpStatusCode.NotFound)
				{
					Content = new StringContent("this is client not founded"),
					ReasonPhrase = "email or password not belong to any client "
				};

				throw new HttpResponseException(msg);
			}
		}


		//Put:Change profile Picture
		//api/megoKora/updateClientPic/1/c:a|D:b|1.jpg
		//[Route("updateClientPic/{sourceImag}/{imageName}")]
		[Route("updateClientPic/{sourceImage}/{imageName}")]

		public void putImag([FromUri]string sourceImage, [FromUri]string imageName, [FromBody]Client currentClient)
		{
			if (currentClient != null)
			{

				string oldName = imageName;
				string NewName = currentClient.ClientID.ToString() + oldName;
				string sourcePath = @sourceImage;
				string targetPath = @"C:\Users\User\Desktop\english";
				//string sourceFile = sourcePath; /*System.IO.Path.Combine(sourcePath, fileName);*/
				string destFile = System.IO.Path.Combine(targetPath, NewName);
				System.IO.File.Copy(sourcePath, destFile, true);
				currentClient.ClientPicture = destFile;
				db.SaveChanges();
			}
			else
			{
				var msg = new HttpResponseMessage(HttpStatusCode.NotFound)
				{
					Content = new StringContent("this id:" + currentClient.ClientID.ToString() + " is not found in clients dataBase"),
					ReasonPhrase = "not found!!! this client to Change Picture",
				};
				throw new HttpResponseException(msg);
			}

		}
		[Route("CheckUniqueMail/{mail}/{id}")]
		public bool getCheckUniqueEmail(string mail, int id)
		{
			Client currentclient = db.Client.FirstOrDefault(c => c.Email == mail);
			if (currentclient != null)
			{
				return true;

			}
			return false;

		}

		//[Route("test")]
		//public void getasda()
		//{
		//	var filepath = "";
		//	filepath = HttpContext.Current.Server.MapPath("~/");
		//	Console.WriteLine(filepath);

		//}
		

	}
}
