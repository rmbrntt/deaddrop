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

    def test_put_drop(self):
        id = str(self.drop_catfact.id)
        response = self.client.put(reverse("drops:drop-detail", kwargs={'id': id}),
                                    {"drop": {"title": "Cat Fact 35",
                                              "message": "A cat has five toes on his front paws, and four on the back, unless he’s a polydactyl."}})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_drop(self):
        id = str(self.drop_catfact.id)
        response = self.client.get(reverse("drops:drop-detail", kwargs={'id': id}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_drop(self):
        id = str(self.drop_catfact.id)
        response = self.client.delete(reverse("drops:drop-detail", kwargs={'id': id}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)