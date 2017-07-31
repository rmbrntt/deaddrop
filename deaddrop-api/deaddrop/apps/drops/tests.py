from rest_framework.test import APITestCase
from rest_framework.reverse import reverse
from rest_framework import status
from deaddrop.apps.drops.models import Drop
from deaddrop.apps.authentication.models import User
from deaddrop.apps.profiles.models import Profile


class DropListTests(APITestCase):
    url = reverse("drops:drop-list")

    def setUp(self):
        self.username = "jaqenhghar"
        self.email = "facelessman@braavos.com"
        self.password = "amanhelps"
        self.user = User.objects.create_user(self.username, self.email, self.password)
        self.client.credentials(HTTP_AUTHORIZATION='Token '+self.user.token)

    def test_create_drop(self):
        response = self.client.post(self.url,
                                    {"drop": {"lat": 38.888802, "lng": -77.031874, "title": "Cat fact 57",
                                             "message": "A cat rubs against people to mark its territory."}})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Drop.objects.count(), 1)
        self.assertEqual(Drop.objects.first().title, "Cat fact 57")
        self.assertEqual(Drop.objects.first().message, "A cat rubs against people to mark its territory.")
        self.assertNotEqual(Drop.objects.first().title, "Cat fact 63")
        self.assertNotEqual(Drop.objects.first().message, "Cats are aliens.")
        self.assertEqual(float(Drop.objects.first().lat), 38.888802)
        self.assertEqual(float(Drop.objects.first().lng), -77.031874)
        self.assertEqual(str(Drop.objects.first().id), response.data.get('id'))

    def test_get_drops(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class DropDetailTests(APITestCase):

    def setUp(self):
        self.username = "jaqenhghar"
        self.email = "facelessman@braavos.com"
        self.password = "amanhelps"
        self.user = User.objects.create_user(self.username, self.email, self.password)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user.token)
        self.profile = Profile.objects.get(user__username=self.username)
        self.drop_catfact = Drop.objects.create(
            title="Cat Fact 26",
            message="Cats make more than 100 different sounds whereas dogs make around 10.",
            lat=13.421,
            lng=124.5300,
            agent=self.profile
        )
        self.id = str(self.drop_catfact.id)
        self.url = reverse("drops:drop-detail", kwargs={'id': self.id})

    def test_put_drop(self):
        response = self.client.put(self.url,
                                    {"drop": {"title": "Cat Fact 35",
                                              "message": "A cat has five toes on his front paws, and four on the back, unless he’s a polydactyl."}})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Drop.objects.get(id=self.id).title, 'Cat Fact 35')
        self.assertEqual(Drop.objects.get(id=self.id).message, 'A cat has five toes on his front paws, and four on the back, unless he’s a polydactyl.')
        self.assertNotEqual(Drop.objects.get(id=self.id).title, 'Dog Fact 35.')
        self.assertNotEqual(Drop.objects.get(id=self.id).message, 'Dogs are wildabeasts.')
        self.assertNotEqual(response.data.get('title'), 'Dog Fact 35.')
        self.assertNotEqual(response.data.get('message'), 'Dogs are wildabeasts.')
        self.assertEqual(float(Drop.objects.first().lat), 13.421)
        self.assertEqual(float(Drop.objects.first().lng), 124.5300)

    def test_get_drop(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Drop.objects.get(id=self.id).title, 'Cat Fact 26')
        self.assertEqual(Drop.objects.get(id=self.id).message, 'Cats make more than 100 different sounds whereas dogs make around 10.')
        self.assertNotEqual(Drop.objects.get(id=self.id).title, 'Dog Fact 35.')
        self.assertNotEqual(Drop.objects.get(id=self.id).message, 'Dogs are wildabeasts.')
        self.assertEqual(float(Drop.objects.first().lat), 13.421)
        self.assertEqual(float(Drop.objects.first().lng), 124.5300)

    def test_delete_drop(self):
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Drop.objects.count(), 0)
