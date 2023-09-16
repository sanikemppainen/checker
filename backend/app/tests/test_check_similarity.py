import unittest
import spacy
import pytest

from ..check_similarity import get_similarity


def test_similarity_same():
    answer = "Sama lause"
    aianswer = "Sama lause"
    similarity = get_similarity(answer, aianswer)
    assert round(similarity, 2) == 1


def test_similarity_bit_different():
    answer = "Aurinko paistaa tänään ulkona"
    aianswer = "Aurinko paistaa eilen ulkona"
    similarity = get_similarity(answer, aianswer)
    assert round(similarity, 2) > 0.9


def test_similarity_low_similarity():
    answer = "Ei paljoo yhteistä"
    aianswer = "Koirat ja kissat"
    similarity = get_similarity(answer, aianswer)
    assert round(similarity, 2) < 0.25


def test_similarity_wrong_input():
    with pytest.raises(TypeError):
        get_similarity()
