import React, { useState, useEffect } from 'react';
import { PageHeader } from '../components/Common/PageHeader';
import { Card } from '../components/Common/Card';
import { Table } from '../components/Common/Table';
import { Button } from '../components/Common/Button';
import { useApp } from '../context/AppContext';
import { Vehicle } from '../types';
import { Plus, Edit, Trash2, Search, Car, Trash, Download, Upload, Eye } from 'lucide-react';

export function Vehicles() {
  const { state, deleteVehicle } = useApp();
  const [mainTab, setMainTab] = useState('search');
  const [creationSubTab, setCreationSubTab] = useState('general');
  const [searchSubTab, setSearchSubTab] = useState('vehicles'); // Nouvel état pour les sous-onglets de recherche
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // États pour les recherches spécifiques à chaque tableau
  const [paymentCardsSearchTerm, setPaymentCardsSearchTerm] = useState('');
  const [vehiclePiecesSearchTerm, setVehiclePiecesSearchTerm] = useState('');
  const [vehicleExpensesSearchTerm, setVehicleExpensesSearchTerm] = useState('');
  const [fuelManagementsSearchTerm, setFuelManagementsSearchTerm] = useState('');
  
  // New state to manage form data for creation
  const [vehicleData, setVehicleData] = useState({
    licensePlate: '',
    fullName: '',
    fuel: '',
    purchaseDate: '',
    vehicleType: '',
    brand: '',
    color: '',
  });
  
  // Données fictives pour les tableaux
  const [vehiclesData, setVehiclesData] = useState<Vehicle[]>([]);
  const [paymentCardsData, setPaymentCardsData] = useState<any[]>([]);
  const [vehiclePiecesData, setVehiclePiecesData] = useState<any[]>([]);
  const [vehicleExpensesData, setVehicleExpensesData] = useState<any[]>([]);
  const [fuelManagementsData, setFuelManagementsData] = useState<any[]>([]);
  
  // Initialiser les données fictives
  useEffect(() => {
    // Données fictives pour les véhicules
    setVehiclesData([
      {
        id: '1',
        brand: 'Toyota',
        model: 'Corolla',
        licensePlate: 'AB-123-CD',
        type: 'car',
        year: 2020,
        mileage: 45000,
        status: 'available',
        assignedTo: 'Jean Dupont',
        purchaseDate: '2020-05-15',
        color: 'Bleu',
        fuel: 'Essence'
      },
      {
        id: '2',
        brand: 'Hyundai',
        model: 'H1',
        licensePlate: 'EF-456-GH',
        type: 'van',
        year: 2019,
        mileage: 78000,
        status: 'in-use',
        assignedTo: 'Marie Martin',
        purchaseDate: '2019-08-22',
        color: 'Blanc',
        fuel: 'Diesel'
      },
      {
        id: '3',
        brand: 'Peugeot',
        model: 'Boxer',
        licensePlate: 'IJ-789-KL',
        type: 'truck',
        year: 2018,
        mileage: 120000,
        status: 'maintenance',
        assignedTo: 'Pierre Bernard',
        purchaseDate: '2018-11-10',
        color: 'Gris',
        fuel: 'Diesel'
      }
    ]);
    // Données fictives pour les cartes de paiement
    setPaymentCardsData([
      {
        id: '1',
        dateAchat: '2023-01-15',
        typeBadge: 'Total',
        typeBadgeLibre: '',
        numBadge: 'BADGE-001',
        description: 'Carte de paiement carburant',
        montant: '10000',
        dateMiseEnService: '2023-01-20',
        nomFichier: 'badge_001.pdf'
      },
      {
        id: '2',
        dateAchat: '2023-02-20',
        typeBadge: 'Shell',
        typeBadgeLibre: '',
        numBadge: 'BADGE-002',
        description: 'Carte de paiement carburant',
        montant: '15000',
        dateMiseEnService: '2023-02-25',
        nomFichier: 'badge_002.pdf'
      }
    ]);
    // Données fictives pour les pièces du véhicule
    setVehiclePiecesData([
      {
        id: '1',
        type: 'Assurance',
        typeLibre: '',
        description: 'Assurance annuelle',
        montant: '250000',
        dateDebut: '2023-01-01',
        dateFin: '2023-12-31',
        dateProchaine: '2024-01-01',
        nomFichier: 'assurance_2023.pdf'
      },
      {
        id: '2',
        type: 'Visite technique',
        typeLibre: '',
        description: 'Contrôle technique',
        montant: '35000',
        dateDebut: '2023-03-15',
        dateFin: '2023-03-15',
        dateProchaine: '2024-03-15',
        nomFichier: 'visite_tech_2023.pdf'
      }
    ]);
    // Données fictives pour les frais
    setVehicleExpensesData([
      {
        id: '1',
        date: '2023-01-10',
        nextDate: '2023-04-10',
        code: 'ENT',
        description: 'Entretien régulier',
        distance: '10000',
        amount: '45000',
        statut: 'payé',
        nomFichier: 'entretien_01.pdf'
      },
      {
        id: '2',
        date: '2023-02-15',
        nextDate: '2023-05-15',
        code: 'PNEU',
        description: 'Changement de pneus',
        distance: '25000',
        amount: '120000',
        statut: 'non-payé',
        nomFichier: 'pneus_02.pdf'
      }
    ]);
    // Données fictives pour la gestion du carburant
    setFuelManagementsData([
      {
        id: '1',
        date: '2023-01-05',
        typePaiement: 'carte',
        distance: '500',
        quantity: '40',
        amount: '24000',
        prixLitre: '600',
        station: 'Station Total Abidjan',
        nomFichier: 'ticket_01.pdf'
      },
      {
        id: '2',
        date: '2023-01-20',
        typePaiement: 'espèces',
        distance: '750',
        quantity: '60',
        amount: '36000',
        prixLitre: '600',
        station: 'Station Shell Cocody',
        nomFichier: 'ticket_02.pdf'
      }
    ]);
  }, []);
  
  // Filtrage des données pour chaque tableau
  const filteredPaymentCards = paymentCardsData.filter(card => 
    card.typeBadge.toLowerCase().includes(paymentCardsSearchTerm.toLowerCase()) ||
    card.numBadge.toLowerCase().includes(paymentCardsSearchTerm.toLowerCase()) ||
    card.description.toLowerCase().includes(paymentCardsSearchTerm.toLowerCase())
  );
  
  const filteredVehiclePieces = vehiclePiecesData.filter(piece => 
    piece.type.toLowerCase().includes(vehiclePiecesSearchTerm.toLowerCase()) ||
    piece.description.toLowerCase().includes(vehiclePiecesSearchTerm.toLowerCase())
  );
  
  const filteredVehicleExpenses = vehicleExpensesData.filter(expense => 
    expense.code.toLowerCase().includes(vehicleExpensesSearchTerm.toLowerCase()) ||
    expense.description.toLowerCase().includes(vehicleExpensesSearchTerm.toLowerCase())
  );
  
  const filteredFuelManagements = fuelManagementsData.filter(fuel => 
    fuel.station.toLowerCase().includes(fuelManagementsSearchTerm.toLowerCase()) ||
    fuel.typePaiement.toLowerCase().includes(fuelManagementsSearchTerm.toLowerCase())
  );
  
  // New states for dynamic tables with structure améliorée
  const [paymentCards, setPaymentCards] = useState([{
    dateAchat: '',
    typeBadge: '',
    typeBadgeLibre: '',
    numBadge: '',
    description: '',
    montant: '',
    dateMiseEnService: '',
    fichierJoint: null
  }]);
  
  const [vehiclePieces, setVehiclePieces] = useState([{
    type: '',
    typeLibre: '',
    description: '',
    montant: '',
    dateDebut: '',
    dateFin: '',
    dateProchaine: '',
    nomFichier: '',
    fichierJoint: null
  }]);
  
  // Tableau de gestion des frais avec structure améliorée
  const [vehicleExpenses, setVehicleExpenses] = useState([{
    date: '',
    nextDate: '',
    code: '',
    description: '',
    distance: '',
    amount: '',
    nomFichier: '',
    fichierJoint: null,
    statut: 'non-payé'
  }]);
  
  // Tableau de gestion du carburant avec structure améliorée
  const [fuelManagements, setFuelManagements] = useState([{
    date: '',
    typePaiement: '',
    distance: '',
    quantity: '',
    amount: '',
    prixLitre: '',
    nomFichier: '',
    fichierJoint: null,
    station: ''
  }]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicleData(prevData => ({ ...prevData, [name]: value }));
  };
  
  // Handlers for dynamic tables
  const addRow = (setter, defaultValues = {}) => {
    setter(prevRows => [...prevRows, { ...defaultValues }]);
  };
  
  const handleRowChange = (index, name, value, setter) => {
    setter(prevRows => {
      const newRows = [...prevRows];
      newRows[index] = { ...newRows[index], [name]: value };
      
      // Calcul automatique du prix au litre si quantité et montant sont renseignés
      if (name === 'quantity' || name === 'amount') {
        if (newRows[index].quantity && newRows[index].amount) {
          const quantity = parseFloat(newRows[index].quantity) || 0;
          const amount = parseFloat(newRows[index].amount) || 0;
          if (quantity > 0) {
            newRows[index].prixLitre = (amount / quantity).toFixed(2);
          }
        }
      }
      
      return newRows;
    });
  };
  
  const removeRow = (index, setter) => {
    setter(prevRows => prevRows.filter((_, i) => i !== index));
  };
  
  const handleFileUpload = (index, file, setter) => {
    setter(prevRows => {
      const newRows = [...prevRows];
      newRows[index] = { 
        ...newRows[index], 
        fichierJoint: file,
        nomFichier: file.name
      };
      return newRows;
    });
  };
  
  // Calcul des totaux pour les frais
  const calculateExpensesTotal = () => {
    return vehicleExpensesData.reduce((total, expense) => {
      return total + (parseFloat(expense.amount) || 0);
    }, 0);
  };
  
  // Calcul des totaux pour le carburant
  const calculateFuelTotal = () => {
    return fuelManagementsData.reduce((total, fuel) => {
      return total + (parseFloat(fuel.amount) || 0);
    }, 0);
  };
  
  // Filtrage des véhicules
  const filteredVehicles = vehiclesData.filter(vehicle => {
    const matchesSearch = vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = statusFilter === 'all' || vehicle.status === statusFilter;
    
    return matchesSearch && matchesFilter;
  });
  
  // Colonnes pour le tableau des véhicules
  const vehicleColumns = [
    {
      key: 'vehicle',
      title: 'Véhicule',
      render: (_: any, record: Vehicle) => (
        <div className="flex items-center">
          <Car className="w-8 h-8 text-blue-600 mr-3" />
          <div>
            <div className="font-medium">{record.brand} {record.model}</div>
            <div className="text-sm text-gray-500">{record.licensePlate}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'type',
      title: 'Type',
      render: (value: string) => {
        const typeLabels = {
          car: 'Voiture',
          truck: 'Camion',
          van: 'Camionnette',
        };
        return typeLabels[value as keyof typeof typeLabels];
      },
    },
    {
      key: 'year',
      title: 'Année',
    },
    {
      key: 'mileage',
      title: 'Kilométrage',
      render: (value: number) => `${value.toLocaleString()} km`,
    },
    {
      key: 'status',
      title: 'Statut',
      render: (value: string) => {
        const statusColors = {
          available: 'bg-green-100 text-green-800',
          'in-use': 'bg-blue-100 text-blue-800',
          maintenance: 'bg-yellow-100 text-yellow-800',
        };
        
        const statusLabels = {
          available: 'Disponible',
          'in-use': 'En utilisation',
          maintenance: 'Maintenance',
        };
        
        return (
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[value as keyof typeof statusColors]}`}>
            {statusLabels[value as keyof typeof statusLabels]}
          </span>
        );
      },
    },
    {
      key: 'assignedTo',
      title: 'Affecté à',
      render: (value: string) => value || 'Non affecté',
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_: any, record: Vehicle) => (
        <div className="flex space-x-2">
          <Button variant="secondary" size="sm" icon={Edit}>
            Modifier
          </Button>
          <Button 
            variant="danger" 
            size="sm" 
            onClick={() => deleteVehicle(record.id)}
            className="text-red-500 hover:bg-red-50"
          >
            Supprimer
          </Button>
        </div>
      ),
    },
  ];
  
  // Colonnes pour le tableau des cartes de paiement
  const paymentCardsColumns = [
    { key: 'dateAchat', title: 'Date d\'achat' },
    { key: 'typeBadge', title: 'Type Badge', render: (value: any, record: any) => record.typeBadgeLibre || value },
    { key: 'numBadge', title: 'N° Badge' },
    { key: 'description', title: 'Description' },
    { key: 'montant', title: 'Montant', render: (value: any) => `${parseFloat(value || 0).toFixed(2)} FCFA` },
    { key: 'dateMiseEnService', title: 'Mise en service' },
    { 
      key: 'actions', 
      title: 'Actions', 
      render: (_: any, record: any) => (
        <div className="flex space-x-2">
          <Button variant="secondary" size="sm" icon={Edit}>
            Modifier
          </Button>
          <Button variant="danger" size="sm" icon={Trash2}>
            Supprimer
          </Button>
        </div>
      )
    }
  ];
  
  // Colonnes pour le tableau des pièces du véhicule
  const vehiclePiecesColumns = [
    { key: 'type', title: 'Type', render: (value: any, record: any) => record.typeLibre || value },
    { key: 'description', title: 'Description' },
    { key: 'montant', title: 'Montant', render: (value: any) => `${parseFloat(value || 0).toFixed(2)} FCFA` },
    { key: 'dateDebut', title: 'Date début' },
    { key: 'dateFin', title: 'Date fin' },
    { key: 'dateProchaine', title: 'Date prochaine' },
    { 
      key: 'actions', 
      title: 'Actions', 
      render: (_: any, record: any) => (
        <div className="flex space-x-2">
          <Button variant="secondary" size="sm" icon={Edit}>
            Modifier
          </Button>
          <Button variant="danger" size="sm" icon={Trash2}>
            Supprimer
          </Button>
        </div>
      )
    }
  ];
  
  // Colonnes pour le tableau des frais
  const vehicleExpensesColumns = [
    { key: 'date', title: 'Date' },
    { key: 'nextDate', title: 'Date prochaine' },
    { key: 'code', title: 'Code' },
    { key: 'description', title: 'Description' },
    { key: 'distance', title: 'Distance (km)' },
    { key: 'amount', title: 'Montant', render: (value: any) => `${parseFloat(value || 0).toFixed(2)} FCFA` },
    { key: 'statut', title: 'Statut', render: (value: string) => {
      const statusColors = {
        'non-payé': 'bg-red-100 text-red-800',
        'payé': 'bg-green-100 text-green-800',
        'remboursé': 'bg-blue-100 text-blue-800',
      };
      
      const statusLabels = {
        'non-payé': 'Non payé',
        'payé': 'Payé',
        'remboursé': 'Remboursé',
      };
      
      return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[value as keyof typeof statusColors]}`}>
          {statusLabels[value as keyof typeof statusLabels]}
        </span>
      );
    }},
    { 
      key: 'actions', 
      title: 'Actions', 
      render: (_: any, record: any) => (
        <div className="flex space-x-2">
          <Button variant="secondary" size="sm" icon={Edit}>
            Modifier
          </Button>
          <Button variant="danger" size="sm" icon={Trash2}>
            Supprimer
          </Button>
        </div>
      )
    }
  ];
  
  // Colonnes pour le tableau de gestion du carburant
  const fuelManagementsColumns = [
    { key: 'date', title: 'Date' },
    { key: 'station', title: 'Station' },
    { key: 'typePaiement', title: 'Type paiement' },
    { key: 'distance', title: 'Distance (km)' },
    { key: 'quantity', title: 'Quantité (L)' },
    { key: 'amount', title: 'Montant', render: (value: any) => `${parseFloat(value || 0).toFixed(2)} FCFA` },
    { key: 'prixLitre', title: 'Prix/L (FCFA)', render: (value: any) => `${parseFloat(value || 0).toFixed(2)}` },
    { 
      key: 'actions', 
      title: 'Actions', 
      render: (_: any, record: any) => (
        <div className="flex space-x-2">
          <Button variant="secondary" size="sm" icon={Edit}>
            Modifier
          </Button>
          <Button variant="danger" size="sm" icon={Trash2}>
            Supprimer
          </Button>
        </div>
      )
    }
  ];
  
  const renderSearchContent = () => {
    return (
      <div className="p-6">
        {/* Onglets pour la recherche */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 font-medium ${searchSubTab === 'vehicles' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setSearchSubTab('vehicles')}
          >
            Véhicules
          </button>
          <button
            className={`px-4 py-2 font-medium ${searchSubTab === 'paymentCards' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setSearchSubTab('paymentCards')}
          >
            Cartes de paiement
          </button>
          <button
            className={`px-4 py-2 font-medium ${searchSubTab === 'vehiclePieces' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setSearchSubTab('vehiclePieces')}
          >
            Pièces du véhicule
          </button>
          <button
            className={`px-4 py-2 font-medium ${searchSubTab === 'vehicleExpenses' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setSearchSubTab('vehicleExpenses')}
          >
            Gestion des frais
          </button>
          <button
            className={`px-4 py-2 font-medium ${searchSubTab === 'fuelManagements' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setSearchSubTab('fuelManagements')}
          >
            Gestion du carburant
          </button>
          <button
            className={`px-4 py-2 font-medium ${searchSubTab === 'cardOperations' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setSearchSubTab('cardOperations')}
          >
            Opérations de carte
          </button>
        </div>
        
        {/* Contenu selon l'onglet sélectionné */}
        {searchSubTab === 'vehicles' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Critère de recherche</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <div>
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Marque</label>
                <input type="text" id="brand" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
              </div>
              <div>
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Couleur</label>
                <input type="text" id="brand" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
              </div>
              <div>
                <label htmlFor="model" className="block text-sm font-medium text-gray-700">Modèle</label>
                <input type="text" id="model" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
              </div>
              <div>
                <label htmlFor="licensePlate" className="block text-sm font-medium text-gray-700">Numero de plaque</label>
                <input type="text" id="licensePlate" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type de véhicule</label>
                <select id="type" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
                  <option>Choisir</option>
                  <option>Voiture</option>
                  <option>Camion</option>
                  <option>Camionnette</option>
                </select>
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Statut</label>
                <select id="status" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
                  <option value="all">Tous les statuts</option>
                  <option value="available">Disponible</option>
                  <option value="in-use">En utilisation</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end mb-6">
              <Button variant="primary" icon={Search}>Rechercher</Button>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Résultat de la recherche</h2>
            <Table data={filteredVehicles} columns={vehicleColumns} />
            
            {filteredVehicles.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">Aucun véhicule trouvé</p>
              </div>
            )}
          </div>
        )}
        
        {searchSubTab === 'paymentCards' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Cartes de paiement</h2>
            
            {/* Barre de recherche pour les cartes de paiement */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input 
                    type="text" 
                    placeholder="Rechercher une carte..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={paymentCardsSearchTerm}
                    onChange={(e) => setPaymentCardsSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Button variant="primary" icon={Search}>
                Rechercher
              </Button>
            </div>
            
            <Table data={filteredPaymentCards} columns={paymentCardsColumns} />
            
            {filteredPaymentCards.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">Aucune carte de paiement trouvée</p>
              </div>
            )}
          </div>
        )}
        
        {searchSubTab === 'vehiclePieces' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Pièces du véhicule</h2>
            
            {/* Barre de recherche pour les pièces du véhicule */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input 
                    type="text" 
                    placeholder="Rechercher une pièce..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={vehiclePiecesSearchTerm}
                    onChange={(e) => setVehiclePiecesSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Button variant="primary" icon={Search}>
                Rechercher
              </Button>
            </div>
            
            <Table data={filteredVehiclePieces} columns={vehiclePiecesColumns} />
            
            {filteredVehiclePieces.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">Aucune pièce trouvée</p>
              </div>
            )}
          </div>
        )}
        
        {searchSubTab === 'vehicleExpenses' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Gestion des frais</h2>
            
            {/* Barre de recherche pour les frais */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input 
                    type="text" 
                    placeholder="Rechercher une dépense..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={vehicleExpensesSearchTerm}
                    onChange={(e) => setVehicleExpensesSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Button variant="primary" icon={Search}>
                Rechercher
              </Button>
            </div>
            
            <Table data={filteredVehicleExpenses} columns={vehicleExpensesColumns} />
            
            {filteredVehicleExpenses.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">Aucune dépense trouvée</p>
              </div>
            )}
            
            {filteredVehicleExpenses.length > 0 && (
              <div className="flex justify-between items-center mt-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-semibold">Total des dépenses</h4>
                  <p className="text-2xl font-bold text-blue-600">{calculateExpensesTotal().toFixed(2)} FCFA</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="secondary" icon={Download}>
                    Exporter
                  </Button>
                  <Button variant="primary" icon={Upload}>
                    Importer
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
        
        {searchSubTab === 'fuelManagements' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Gestion du carburant</h2>
            
            {/* Barre de recherche pour le carburant */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input 
                    type="text" 
                    placeholder="Rechercher un plein..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={fuelManagementsSearchTerm}
                    onChange={(e) => setFuelManagementsSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Button variant="primary" icon={Search}>
                Rechercher
              </Button>
            </div>
            
            <Table data={filteredFuelManagements} columns={fuelManagementsColumns} />
            
            {filteredFuelManagements.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">Aucun enregistrement de carburant trouvé</p>
              </div>
            )}
            
            {filteredFuelManagements.length > 0 && (
              <div className="flex justify-between items-center mt-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-semibold">Total carburant</h4>
                  <p className="text-2xl font-bold text-green-600">{calculateFuelTotal().toFixed(2)} FCFA</p>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Consommation moyenne: {fuelManagementsData.length > 0 ? (fuelManagementsData.reduce((total, fuel) => total + (parseFloat(fuel.quantity) || 0), 0) / fuelManagementsData.length).toFixed(2) : '0.00'} L/plein</p>
                </div>
              </div>
            )}
          </div>
        )}
        
        {searchSubTab === 'cardOperations' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Opérations de carte</h2>
            
            {/* Barre de recherche pour les opérations de carte */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input 
                    type="text" 
                    placeholder="Rechercher une opération..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={paymentCardsSearchTerm}
                    onChange={(e) => setPaymentCardsSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Button variant="primary" icon={Search}>
                Rechercher
              </Button>
            </div>
            
            <Table data={filteredPaymentCards} columns={paymentCardsColumns} />
            
            {filteredPaymentCards.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">Aucune opération de carte trouvée</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };
  
  const renderContent = () => {
    if (mainTab === 'search') {
      return renderSearchContent();
    }
    
    if (mainTab === 'creation') {
      return (
        <div className="p-6">
          <div className="flex border-b border-gray-200 mb-4">
            <button
              className={`px-4 py-2 font-medium ${creationSubTab === 'general' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setCreationSubTab('general')}
            >
              Informations Générales
            </button>
            <button
              className={`px-4 py-2 font-medium ${creationSubTab === 'expenses' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setCreationSubTab('expenses')}
            >
              Gestion des frais
            </button>
            <button
              className={`px-4 py-2 font-medium ${creationSubTab === 'badges' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setCreationSubTab('badges')}
            >
              Opérations de Carte/Badge
            </button>
          </div>
          
          {creationSubTab === 'general' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">N° Plaque (Immat) *</label>
                  <input type="text" name="licensePlate" value={vehicleData.licensePlate} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nom complet</label>
                  <input type="text" name="fullName" value={vehicleData.fullName} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Carburant</label>
                  <select name="fuel" value={vehicleData.fuel} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option value="">Choisir</option>
                    <option value="Essence">Essence</option>
                    <option value="Diesel">Diesel</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date d'achat</label>
                  <input type="date" name="purchaseDate" value={vehicleData.purchaseDate} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                 <div>
                  <label className="block text-sm font-medium text-gray-700">affecté à</label>
                  <input type="text" name="assignedTo" value={vehicleData.fullName} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type de véhicule</label>
                  <select name="vehicleType" value={vehicleData.vehicleType} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option value="">Choisir</option>
                    <option value="Voiture">Voiture</option>
                    <option value="Camion">Camion</option>
                    <option value="Remorque">Remorque</option>
                    <option value="Autres">Autres</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Marque du véhicule</label>
                  <select name="brand" value={vehicleData.brand} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option value="">Choisir</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Hyundai">Hyundai</option>
                    <option value="Peugeot">Peugeot</option>
                    <option value="Renault">Renault</option>
                    <option value="Autres">Autres</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Couleur</label>
                  <select name="color" value={vehicleData.color} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option value="">Choisir</option>
                    <option value="Bleu">Bleu</option>
                    <option value="Blanc">Blanc</option>
                    <option value="Gris">Gris</option>
                    <option value="Noir">Noir</option>
                    <option value="Marron">Marron</option>
                    <option value="Autres">Autres</option>
                  </select>
                </div>
                   <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Statut</label>
                    <select id="status" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
                      <option value="available">Disponible</option>
                      <option value="in-use">En utilisation</option>
                      <option value="maintenance">Maintenance</option>
                    </select>
                  </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Kilométrage</label>
                  <input type="text" name="fullName" value={vehicleData.fullName} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
              </div>
              <div className="col-span-2">
                <h3 className="font-semibold text-md mt-4 mb-2">Liste carte de paiement</h3>
                <Table
                  data={paymentCards}
                  columns={[
                    { 
                      key: 'actions', 
                      title: '#', 
                      render: (_: any, record: any, index: number) => (
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="icon" 
                            size="sm"
                            className="text-green-500"
                            onClick={() => addRow(setPaymentCards, {
                              dateAchat: '',
                              typeBadge: '',
                              typeBadgeLibre: '',
                              numBadge: '',
                              description: '',
                              montant: '',
                              dateMiseEnService: '',
                              fichierJoint: null
                            })}
                          >
                            <Plus size={16} />
                          </Button>
                          {index > 0 && (
                            <Button 
                              variant="icon" 
                              size="sm"
                              className="text-red-500"
                              onClick={() => removeRow(index, setPaymentCards)}
                            >
                              <Trash size={16} />
                            </Button>
                          )}
                        </div>
                      ) 
                    },
                    { key: 'dateAchat', title: 'Date d\'achat', render: (value: any, record: any, index: number) => <input type="date" value={value || ''} onChange={(e) => handleRowChange(index, 'dateAchat', e.target.value, setPaymentCards)} className="px-2 py-1 border border-gray-300 rounded-md w-full" /> },
                    { key: 'typeBadge', title: 'Type Badge', render: (value: any, record: any, index: number) => (
                        <div className="flex gap-2">
                          <select value={value || ''} onChange={(e) => handleRowChange(index, 'typeBadge', e.target.value, setPaymentCards)} className="px-2 py-1 border border-gray-300 rounded-md w-full">
                              <option value="">Choisir</option>
                              <option value="Total">Total</option>
                              <option value="Shell">Shell</option>
                              <option value="Autres">Autres</option>
                          </select>
                          <input 
                            type="text" 
                            value={record.typeBadgeLibre || ''} 
                            onChange={(e) => handleRowChange(index, 'typeBadgeLibre', e.target.value, setPaymentCards)}
                            placeholder="Type libre"
                            className="px-2 py-1 border border-gray-300 rounded-md w-full"
                          />
                        </div>
                      ) },
                    { key: 'numBadge', title: 'N° Badge', render: (value: any, record: any, index: number) => <input type="text" value={value || ''} onChange={(e) => handleRowChange(index, 'numBadge', e.target.value, setPaymentCards)} className="px-2 py-1 border border-gray-300 rounded-md w-full" /> },
                    { key: 'description', title: 'Description', render: (value: any, record: any, index: number) => <input type="text" value={value || ''} onChange={(e) => handleRowChange(index, 'description', e.target.value, setPaymentCards)} className="px-2 py-1 border border-gray-300 rounded-md w-full" /> },
                    { key: 'montant', title: 'Montant', render: (value: any, record: any, index: number) => <input type="number" step="0.01" value={value || ''} onChange={(e) => handleRowChange(index, 'montant', e.target.value, setPaymentCards)} className="px-2 py-1 border border-gray-300 rounded-md w-full" /> },
                    { key: 'dateMiseEnService', title: 'Date mise en service', render: (value: any, record: any, index: number) => <input type="date" value={value || ''} onChange={(e) => handleRowChange(index, 'dateMiseEnService', e.target.value, setPaymentCards)} className="px-2 py-1 border border-gray-300 rounded-md w-full" /> },
                    { key: 'fichierJoint', title: 'Fichier joint', render: (value: any, record: any, index: number) => (
                      <div className="flex items-center gap-2">
                        <input 
                          type="file" 
                          onChange={(e) => handleFileUpload(index, e.target.files?.[0], setPaymentCards)}
                          className="hidden" 
                          id={`payment-card-file-${index}`}
                        />
                        <label htmlFor={`payment-card-file-${index}`} className="cursor-pointer bg-gray-100 px-2 py-1 rounded-md text-sm hover:bg-gray-200">
                          {record.nomFichier || 'Choisir fichier'}
                        </label>
                        {record.nomFichier && (
                          <span className="text-xs text-gray-500">{record.nomFichier}</span>
                        )}
                      </div>
                    ) }
                  ]}
                />
              </div>
              <div className="col-span-2 mt-6">
                <h3 className="font-semibold text-md mb-2">Liste des pièces du véhicule</h3>
                <Table
                  data={vehiclePieces}
                  columns={[
                    { 
                      key: 'actions', 
                      title: '#', 
                      render: (_: any, record: any, index: number) => (
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="icon" 
                            size="sm"
                            className="text-green-500"
                            onClick={() => addRow(setVehiclePieces, {
                              type: '',
                              typeLibre: '',
                              description: '',
                              montant: '',
                              dateDebut: '',
                              dateFin: '',
                              dateProchaine: '',
                              nomFichier: '',
                              fichierJoint: null
                            })}
                          >
                            <Plus size={16} />
                          </Button>
                          {index > 0 && (
                            <Button 
                              variant="icon" 
                              size="sm"
                              className="text-red-500"
                              onClick={() => removeRow(index, setVehiclePieces)}
                            >
                              <Trash size={16} />
                            </Button>
                          )}
                        </div>
                      ) 
                    },
                    { key: 'type', title: 'Type', render: (value: any, record: any, index: number) => (
                      <div className="flex gap-2">
                        <select value={value || ''} onChange={(e) => handleRowChange(index, 'type', e.target.value, setVehiclePieces)} className="px-2 py-1 border border-gray-300 rounded-md w-full">
                          <option value="">Choisir</option>
                          <option value="Assurance">Assurance</option>
                          <option value="Vignette">Vignette</option>
                          <option value="Visite technique">Visite technique</option>
                          <option value="Autres">Autres</option>
                        </select>
                        <input 
                          type="text" 
                          value={record.typeLibre || ''} 
                          onChange={(e) => handleRowChange(index, 'typeLibre', e.target.value, setVehiclePieces)}
                          placeholder="Type libre"
                          className="px-2 py-1 border border-gray-300 rounded-md w-full"
                        />
                      </div>
                    ) },
                    { key: 'description', title: 'Description', render: (value: any, record: any, index: number) => <input type="text" value={value || ''} onChange={(e) => handleRowChange(index, 'description', e.target.value, setVehiclePieces)} className="px-2 py-1 border border-gray-300 rounded-md w-full" /> },
                    { key: 'montant', title: 'Montant', render: (value: any, record: any, index: number) => <input type="number" step="0.01" value={value || ''} onChange={(e) => handleRowChange(index, 'montant', e.target.value, setVehiclePieces)} className="px-2 py-1 border border-gray-300 rounded-md w-full" /> },
                    { key: 'dateDebut', title: 'Date début', render: (value: any, record: any, index: number) => <input type="date" value={value || ''} onChange={(e) => handleRowChange(index, 'dateDebut', e.target.value, setVehiclePieces)} className="px-2 py-1 border border-gray-300 rounded-md w-full" /> },
                    { key: 'dateFin', title: 'Date fin', render: (value: any, record: any, index: number) => <input type="date" value={value || ''} onChange={(e) => handleRowChange(index, 'dateFin', e.target.value, setVehiclePieces)} className="px-2 py-1 border border-gray-300 rounded-md w-full" /> },
                    { key: 'dateProchaine', title: 'Date prochaine', render: (value: any, record: any, index: number) => <input type="date" value={value || ''} onChange={(e) => handleRowChange(index, 'dateProchaine', e.target.value, setVehiclePieces)} className="px-2 py-1 border border-gray-300 rounded-md w-full" /> },
                    { key: 'fichierJoint', title: 'Fichier joint', render: (value: any, record: any, index: number) => (
                      <div className="flex items-center gap-2">
                        <input 
                          type="file" 
                          onChange={(e) => handleFileUpload(index, e.target.files?.[0], setVehiclePieces)}
                          className="hidden" 
                          id={`vehicle-piece-file-${index}`}
                        />
                        <label htmlFor={`vehicle-piece-file-${index}`} className="cursor-pointer bg-gray-100 px-2 py-1 rounded-md text-sm hover:bg-gray-200">
                          {record.nomFichier || 'Choisir fichier'}
                        </label>
                        {record.nomFichier && (
                          <span className="text-xs text-gray-500">{record.nomFichier}</span>
                        )}
                      </div>
                    ) }
                  ]}
                />
              </div>
              <div className="col-span-2 flex justify-end space-x-4 mt-6">
                <Button variant="secondary">Annuler</Button>
                <Button variant="primary">Enregistrer</Button>
              </div>
            </div>
          )}
          
          {creationSubTab === 'expenses' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-4">Gestion des Frais</h3>
                  <p className="text-gray-600 mb-4">Gérez les différents frais associés à ce véhicule</p>
                </div>
                <div className="flex justify-end">
                  <Button 
                    variant="primary" 
                    icon={Plus}
                    onClick={() => addRow(setVehicleExpenses, {
                      date: '',
                      nextDate: '',
                      code: '',
                      description: '',
                      distance: '',
                      amount: '',
                      nomFichier: '',
                      fichierJoint: null,
                      statut: 'non-payé'
                    })}
                  >
                    Ajouter une dépense
                  </Button>
                </div>
              </div>
              <Table
                data={vehicleExpenses}
                columns={[
                  { 
                    key: 'actions', 
                    title: 'Actions', 
                    render: (_: any, record: any, index: number) => (
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="icon" 
                          size="sm"
                          className="text-red-500"
                          onClick={() => removeRow(index, setVehicleExpenses)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    ) 
                  },
                  { key: 'date', title: 'Date', render: (value: any, record: any, index: number) => (
                    <input 
                      type="date" 
                      value={value || ''} 
                      onChange={(e) => handleRowChange(index, 'date', e.target.value, setVehicleExpenses)}
                      className="px-2 py-1 border border-gray-300 rounded-md w-full"
                    />
                  ) },
                  { key: 'nextDate', title: 'Date prochaine', render: (value: any, record: any, index: number) => (
                    <input 
                      type="date" 
                      value={value || ''} 
                      onChange={(e) => handleRowChange(index, 'nextDate', e.target.value, setVehicleExpenses)}
                      className="px-2 py-1 border border-gray-300 rounded-md w-full"
                    />
                  ) },
                  { key: 'code', title: 'Code', render: (value: any, record: any, index: number) => (
                    <select 
                      value={value || ''} 
                      onChange={(e) => handleRowChange(index, 'code', e.target.value, setVehicleExpenses)}
                      className="px-2 py-1 border border-gray-300 rounded-md w-full"
                    >
                      <option value="">Sélectionner</option>
                      <option value="ENT">Entretien</option>
                      <option value="PNEU">Pneus</option>
                      <option value="REP">Réparation</option>
                      <option value="ASS">Assurance</option>
                      <option value="VID">Vidange</option>
                    </select>
                  ) },
                  { key: 'description', title: 'Description', render: (value: any, record: any, index: number) => (
                    <input 
                      type="text" 
                      value={value || ''} 
                      onChange={(e) => handleRowChange(index, 'description', e.target.value, setVehicleExpenses)}
                      className="px-2 py-1 border border-gray-300 rounded-md w-full"
                      placeholder="Description de la dépense"
                    />
                  ) },
                  { key: 'distance', title: 'Distance (km)', render: (value: any, record: any, index: number) => (
                    <input 
                      type="number" 
                      value={value || ''} 
                      onChange={(e) => handleRowChange(index, 'distance', e.target.value, setVehicleExpenses)}
                      className="px-2 py-1 border border-gray-300 rounded-md w-full"
                      placeholder="0"
                    />
                  ) },
                  { key: 'amount', title: 'Montant (€)', render: (value: any, record: any, index: number) => (
                    <input 
                      type="number" 
                      step="0.01"
                      value={value || ''} 
                      onChange={(e) => handleRowChange(index, 'amount', e.target.value, setVehicleExpenses)}
                      className="px-2 py-1 border border-gray-300 rounded-md w-full"
                      placeholder="0.00"
                    />
                  ) },
                  { key: 'statut', title: 'Statut', render: (value: any, record: any, index: number) => (
                    <select 
                      value={value || 'non-payé'} 
                      onChange={(e) => handleRowChange(index, 'statut', e.target.value, setVehicleExpenses)}
                      className="px-2 py-1 border border-gray-300 rounded-md w-full"
                    >
                      <option value="non-payé">Non payé</option>
                      <option value="payé">Payé</option>
                      <option value="remboursé">Remboursé</option>
                    </select>
                  ) },
                  { key: 'fichierJoint', title: 'Justificatif', render: (value: any, record: any, index: number) => (
                    <div className="flex items-center gap-2">
                      <input 
                        type="file" 
                        onChange={(e) => handleFileUpload(index, e.target.files?.[0], setVehicleExpenses)}
                        className="hidden" 
                        id={`expense-file-${index}`}
                      />
                      <label htmlFor={`expense-file-${index}`} className="cursor-pointer bg-gray-100 px-2 py-1 rounded-md text-sm hover:bg-gray-200">
                        {record.nomFichier || 'Ajouter fichier'}
                      </label>
                    </div>
                  ) }
                ]}
              />
              <div className="flex justify-between items-center mt-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-semibold">Total des dépenses</h4>
                  <p className="text-2xl font-bold text-blue-600">{calculateExpensesTotal().toFixed(2)} FCFA</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="secondary" icon={Download}>
                    Exporter
                  </Button>
                  <Button variant="primary" icon={Upload}>
                    Importer
                  </Button>
                </div>
              </div>
             
              {/* Section Gestion du carburant */}
              <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg">Gestion du Carburant</h3>
                  <Button 
                    variant="primary" 
                    icon={Plus}
                    onClick={() => addRow(setFuelManagements, {
                      date: '',
                      typePaiement: '',
                      distance: '',
                      quantity: '',
                      amount: '',
                      prixLitre: '',
                      nomFichier: '',
                      fichierJoint: null,
                      station: ''
                    })}
                  >
                    Nouveau plein
                  </Button>
                </div>
                <Table
                  data={fuelManagements}
                  columns={[
                    { 
                      key: 'actions', 
                      title: 'Actions', 
                      render: (_: any, record: any, index: number) => (
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="icon" 
                            size="sm"
                            className="text-red-500"
                            onClick={() => removeRow(index, setFuelManagements)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      ) 
                    },
                    { key: 'date', title: 'Date', render: (value: any, record: any, index: number) => (
                      <input 
                        type="date" 
                        value={value || ''} 
                        onChange={(e) => handleRowChange(index, 'date', e.target.value, setFuelManagements)}
                        className="px-2 py-1 border border-gray-300 rounded-md w-full"
                      />
                    ) },
                    { key: 'station', title: 'Station', render: (value: any, record: any, index: number) => (
                      <input 
                        type="text" 
                        value={value || ''} 
                        onChange={(e) => handleRowChange(index, 'station', e.target.value, setFuelManagements)}
                        className="px-2 py-1 border border-gray-300 rounded-md w-full"
                        placeholder="Nom de la station"
                      />
                    ) },
                    { key: 'typePaiement', title: 'Type paiement', render: (value: any, record: any, index: number) => (
                      <select 
                        value={value || ''} 
                        onChange={(e) => handleRowChange(index, 'typePaiement', e.target.value, setFuelManagements)}
                        className="px-2 py-1 border border-gray-300 rounded-md w-full"
                      >
                        <option value="">Sélectionner</option>
                        <option value="carte">Carte</option>
                        <option value="espèces">Espèces</option>
                        <option value="badge">Badge</option>
                      </select>
                    ) },
                    { key: 'distance', title: 'Distance (km)', render: (value: any, record: any, index: number) => (
                      <input 
                        type="number" 
                        value={value || ''} 
                        onChange={(e) => handleRowChange(index, 'distance', e.target.value, setFuelManagements)}
                        className="px-2 py-1 border border-gray-300 rounded-md w-full"
                        placeholder="0"
                      />
                    ) },
                    { key: 'quantity', title: 'Quantité (L)', render: (value: any, record: any, index: number) => (
                      <input 
                        type="number" 
                        step="0.01"
                        value={value || ''} 
                        onChange={(e) => handleRowChange(index, 'quantity', e.target.value, setFuelManagements)}
                        className="px-2 py-1 border border-gray-300 rounded-md w-full"
                        placeholder="0.00"
                      />
                    ) },
                    { key: 'amount', title: 'Montant (€)', render: (value: any, record: any, index: number) => (
                      <input 
                        type="number" 
                        step="0.01"
                        value={value || ''} 
                        onChange={(e) => handleRowChange(index, 'amount', e.target.value, setFuelManagements)}
                        className="px-2 py-1 border border-gray-300 rounded-md w-full"
                        placeholder="0.00"
                      />
                    ) },
                    { key: 'prixLitre', title: 'Prix/L (€)', render: (value: any, record: any, index: number) => (
                      <input 
                        type="number" 
                        step="0.001"
                        value={value || ''} 
                        onChange={(e) => handleRowChange(index, 'prixLitre', e.target.value, setFuelManagements)}
                        className="px-2 py-1 border border-gray-300 rounded-md w-full"
                        placeholder="0.000"
                        readOnly
                      />
                    ) },
                    { key: 'fichierJoint', title: 'Ticket', render: (value: any, record: any, index: number) => (
                      <div className="flex items-center gap-2">
                        <input 
                          type="file" 
                          onChange={(e) => handleFileUpload(index, e.target.files?.[0], setFuelManagements)}
                          className="hidden" 
                          id={`fuel-file-${index}`}
                        />
                        <label htmlFor={`fuel-file-${index}`} className="cursor-pointer bg-gray-100 px-2 py-1 rounded-md text-sm hover:bg-gray-200">
                          {record.nomFichier || 'Ajouter ticket'}
                        </label>
                      </div>
                    ) }
                  ]}
                />
                <div className="flex justify-between items-center mt-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold">Total carburant</h4>
                    <p className="text-2xl font-bold text-green-600">{calculateFuelTotal().toFixed(2)} FCFA</p>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Consommation moyenne: {fuelManagements.length > 0 ? (fuelManagements.reduce((total, fuel) => total + (parseFloat(fuel.quantity) || 0), 0) / fuelManagements.length).toFixed(2) : '0.00'} L/plein</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <Button variant="secondary">Annuler</Button>
                <Button variant="primary">Enregistrer les frais</Button>
              </div>
            </div>
          )}
          
          {creationSubTab === 'badges' && (
            <div className="space-y-6"> 
              {/* Formulaire d'ajout de badge */}
              <div className="bg-white rounded-lg shadow p-6">
                <h4 className="font-semibold mb-4">Ajouter un nouveau badge</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type de badge</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option value="">Sélectionner</option>
                      <option value="Total">Total</option>
                      <option value="Shell">Shell</option>
                      <option value="Autres">Autres</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type libre</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Autre type de badge" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">N° de badge</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Numéro du badge" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date d'achat</label>
                    <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date mise en service</label>
                    <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Montant</label>
                    <input type="number" step="0.01" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="0.00" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md" rows={3} placeholder="Description du badge"></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fichier joint</label>
                    <input type="file" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                  </div>
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <Button variant="secondary">Annuler</Button>
                  <Button variant="primary">Ajouter le badge</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }
  }
  
  return (
    <div className="space-y-6">
      <PageHeader
        title="Gestion des Véhicules"
      />
      
      <Card>
        <div className="flex border-b border-gray-200">
          <button
            className={`px-4 py-2 font-medium ${mainTab === 'search' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setMainTab('search')}
          >
            Recherche
          </button>
          <button
            className={`px-4 py-2 font-medium ${mainTab === 'creation' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setMainTab('creation')}
          >
            Création
          </button>
        </div>
        
        {renderContent()}
      </Card>
    </div>
  );
}