export const PermissionsLib = 
{
  "contractName": "PermissionsLib",
  "abi": [],
  "bytecode": "0x60606040523415600e57600080fd5b603580601b6000396000f3006060604052600080fd00a165627a7a72305820c354ce7b74c3d2f71d288e1e04a33cbf1ca35c1d7dcdd13bafeacebea2bedd460029",
  "deployedBytecode": "0x6060604052600080fd00a165627a7a72305820c354ce7b74c3d2f71d288e1e04a33cbf1ca35c1d7dcdd13bafeacebea2bedd460029",
  "sourceMap": "610:2090:12:-;;;;;;;;;;;;;;;;;",
  "deployedSourceMap": "610:2090:12:-;;;;;",
  "source": "/*\n\n  Copyright 2017 Dharma Labs Inc.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n\n*/\n\npragma solidity 0.4.18;\n\n\nlibrary PermissionsLib {\n    struct Permissions {\n        mapping (address => bool) authorized;\n        mapping (address => uint) agentToIndex; // ensures O(1) look-up\n        address[] authorizedAgents;\n    }\n\n    function authorize(Permissions storage self, address agent)\n        internal\n    {\n        require(isNotAuthorized(self, agent));\n\n        self.authorized[agent] = true;\n        self.authorizedAgents.push(agent);\n        self.agentToIndex[agent] = self.authorizedAgents.length - 1;\n    }\n\n    function revokeAuthorization(Permissions storage self, address agent)\n        internal\n    {\n        /* We only want to do work in the case where the agent whose\n        authorization is being revoked had authorization permissions in the\n        first place. */\n        require(isAuthorized(self, agent));\n\n        uint indexOfAgentToRevoke = self.agentToIndex[agent];\n        uint indexOfAgentToMove = self.authorizedAgents.length - 1;\n        address agentToMove = self.authorizedAgents[indexOfAgentToMove];\n\n        // Revoke the agent's authorization.\n        delete self.authorized[agent];\n\n        // Remove the agent from our collection of authorized agents.\n        self.authorizedAgents[indexOfAgentToRevoke] = agentToMove;\n\n        // Update our indices to reflect the above changes.\n        self.agentToIndex[agentToMove] = indexOfAgentToRevoke;\n        delete self.agentToIndex[agent];\n\n        // Clean up memory that's no longer being used.\n        delete self.authorizedAgents[indexOfAgentToMove];\n        self.authorizedAgents.length -= 1;\n    }\n\n    function isAuthorized(Permissions storage self, address agent)\n        internal\n        view\n        returns (bool)\n    {\n        return self.authorized[agent];\n    }\n\n    function isNotAuthorized(Permissions storage self, address agent)\n        internal\n        view\n        returns (bool)\n    {\n        return !isAuthorized(self, agent);\n    }\n\n    function getAuthorizedAgents(Permissions storage self)\n        internal\n        view\n        returns (address[])\n    {\n        return self.authorizedAgents;\n    }\n}\n",
  "sourcePath": "/Users/nadavhollander/Documents/Dharma/Development/charta/contracts/libraries/PermissionsLib.sol",
  "ast": {
    "attributes": {
      "absolutePath": "/Users/nadavhollander/Documents/Dharma/Development/charta/contracts/libraries/PermissionsLib.sol",
      "exportedSymbols": {
        "PermissionsLib": [
          3905
        ]
      }
    },
    "children": [
      {
        "attributes": {
          "literals": [
            "solidity",
            "0.4",
            ".18"
          ]
        },
        "id": 3727,
        "name": "PragmaDirective",
        "src": "584:23:12"
      },
      {
        "attributes": {
          "baseContracts": [
            null
          ],
          "contractDependencies": [
            null
          ],
          "contractKind": "library",
          "documentation": null,
          "fullyImplemented": true,
          "linearizedBaseContracts": [
            3905
          ],
          "name": "PermissionsLib",
          "scope": 3906
        },
        "children": [
          {
            "attributes": {
              "canonicalName": "PermissionsLib.Permissions",
              "name": "Permissions",
              "scope": 3905,
              "visibility": "public"
            },
            "children": [
              {
                "attributes": {
                  "constant": false,
                  "name": "authorized",
                  "scope": 3739,
                  "stateVariable": false,
                  "storageLocation": "default",
                  "type": "mapping(address => bool)",
                  "value": null,
                  "visibility": "internal"
                },
                "children": [
                  {
                    "attributes": {
                      "type": "mapping(address => bool)"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "type": "address"
                        },
                        "id": 3728,
                        "name": "ElementaryTypeName",
                        "src": "677:7:12"
                      },
                      {
                        "attributes": {
                          "name": "bool",
                          "type": "bool"
                        },
                        "id": 3729,
                        "name": "ElementaryTypeName",
                        "src": "688:4:12"
                      }
                    ],
                    "id": 3730,
                    "name": "Mapping",
                    "src": "668:25:12"
                  }
                ],
                "id": 3731,
                "name": "VariableDeclaration",
                "src": "668:36:12"
              },
              {
                "attributes": {
                  "constant": false,
                  "name": "agentToIndex",
                  "scope": 3739,
                  "stateVariable": false,
                  "storageLocation": "default",
                  "type": "mapping(address => uint256)",
                  "value": null,
                  "visibility": "internal"
                },
                "children": [
                  {
                    "attributes": {
                      "type": "mapping(address => uint256)"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "type": "address"
                        },
                        "id": 3732,
                        "name": "ElementaryTypeName",
                        "src": "723:7:12"
                      },
                      {
                        "attributes": {
                          "name": "uint",
                          "type": "uint256"
                        },
                        "id": 3733,
                        "name": "ElementaryTypeName",
                        "src": "734:4:12"
                      }
                    ],
                    "id": 3734,
                    "name": "Mapping",
                    "src": "714:25:12"
                  }
                ],
                "id": 3735,
                "name": "VariableDeclaration",
                "src": "714:38:12"
              },
              {
                "attributes": {
                  "constant": false,
                  "name": "authorizedAgents",
                  "scope": 3739,
                  "stateVariable": false,
                  "storageLocation": "default",
                  "type": "address[] storage pointer",
                  "value": null,
                  "visibility": "internal"
                },
                "children": [
                  {
                    "attributes": {
                      "length": null,
                      "type": "address[] storage pointer"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "type": "address"
                        },
                        "id": 3736,
                        "name": "ElementaryTypeName",
                        "src": "786:7:12"
                      }
                    ],
                    "id": 3737,
                    "name": "ArrayTypeName",
                    "src": "786:9:12"
                  }
                ],
                "id": 3738,
                "name": "VariableDeclaration",
                "src": "786:26:12"
              }
            ],
            "id": 3739,
            "name": "StructDefinition",
            "src": "639:180:12"
          },
          {
            "attributes": {
              "constant": false,
              "implemented": true,
              "isConstructor": false,
              "modifiers": [
                null
              ],
              "name": "authorize",
              "payable": false,
              "scope": 3905,
              "stateMutability": "nonpayable",
              "superFunction": null,
              "visibility": "internal"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "self",
                      "scope": 3782,
                      "stateVariable": false,
                      "storageLocation": "storage",
                      "type": "struct PermissionsLib.Permissions storage pointer",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "contractScope": null,
                          "name": "Permissions",
                          "referencedDeclaration": 3739,
                          "type": "struct PermissionsLib.Permissions storage pointer"
                        },
                        "id": 3740,
                        "name": "UserDefinedTypeName",
                        "src": "844:11:12"
                      }
                    ],
                    "id": 3741,
                    "name": "VariableDeclaration",
                    "src": "844:24:12"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "agent",
                      "scope": 3782,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "type": "address"
                        },
                        "id": 3742,
                        "name": "ElementaryTypeName",
                        "src": "870:7:12"
                      }
                    ],
                    "id": 3743,
                    "name": "VariableDeclaration",
                    "src": "870:13:12"
                  }
                ],
                "id": 3744,
                "name": "ParameterList",
                "src": "843:41:12"
              },
              {
                "attributes": {
                  "parameters": [
                    null
                  ]
                },
                "children": [],
                "id": 3745,
                "name": "ParameterList",
                "src": "906:0:12"
              },
              {
                "children": [
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "type": "tuple()",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                }
                              ],
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 5478,
                              "type": "function (bool) pure",
                              "value": "require"
                            },
                            "id": 3746,
                            "name": "Identifier",
                            "src": "916:7:12"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "isStructConstructorCall": false,
                              "lValueRequested": false,
                              "names": [
                                null
                              ],
                              "type": "bool",
                              "type_conversion": false
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": [
                                    {
                                      "typeIdentifier": "t_struct$_Permissions_$3739_storage_ptr",
                                      "typeString": "struct PermissionsLib.Permissions storage pointer"
                                    },
                                    {
                                      "typeIdentifier": "t_address",
                                      "typeString": "address"
                                    }
                                  ],
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 3892,
                                  "type": "function (struct PermissionsLib.Permissions storage pointer,address) view returns (bool)",
                                  "value": "isNotAuthorized"
                                },
                                "id": 3747,
                                "name": "Identifier",
                                "src": "924:15:12"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 3741,
                                  "type": "struct PermissionsLib.Permissions storage pointer",
                                  "value": "self"
                                },
                                "id": 3748,
                                "name": "Identifier",
                                "src": "940:4:12"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 3743,
                                  "type": "address",
                                  "value": "agent"
                                },
                                "id": 3749,
                                "name": "Identifier",
                                "src": "946:5:12"
                              }
                            ],
                            "id": 3750,
                            "name": "FunctionCall",
                            "src": "924:28:12"
                          }
                        ],
                        "id": 3751,
                        "name": "FunctionCall",
                        "src": "916:37:12"
                      }
                    ],
                    "id": 3752,
                    "name": "ExpressionStatement",
                    "src": "916:37:12"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "=",
                          "type": "bool"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": true,
                              "type": "bool"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "member_name": "authorized",
                                  "referencedDeclaration": 3731,
                                  "type": "mapping(address => bool)"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 3741,
                                      "type": "struct PermissionsLib.Permissions storage pointer",
                                      "value": "self"
                                    },
                                    "id": 3753,
                                    "name": "Identifier",
                                    "src": "964:4:12"
                                  }
                                ],
                                "id": 3756,
                                "name": "MemberAccess",
                                "src": "964:15:12"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 3743,
                                  "type": "address",
                                  "value": "agent"
                                },
                                "id": 3755,
                                "name": "Identifier",
                                "src": "980:5:12"
                              }
                            ],
                            "id": 3757,
                            "name": "IndexAccess",
                            "src": "964:22:12"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "hexvalue": "74727565",
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "lValueRequested": false,
                              "subdenomination": null,
                              "token": "bool",
                              "type": "bool",
                              "value": "true"
                            },
                            "id": 3758,
                            "name": "Literal",
                            "src": "989:4:12"
                          }
                        ],
                        "id": 3759,
                        "name": "Assignment",
                        "src": "964:29:12"
                      }
                    ],
                    "id": 3760,
                    "name": "ExpressionStatement",
                    "src": "964:29:12"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "type": "uint256",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                }
                              ],
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "member_name": "push",
                              "referencedDeclaration": null,
                              "type": "function (address) returns (uint256)"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "member_name": "authorizedAgents",
                                  "referencedDeclaration": 3738,
                                  "type": "address[] storage ref"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 3741,
                                      "type": "struct PermissionsLib.Permissions storage pointer",
                                      "value": "self"
                                    },
                                    "id": 3761,
                                    "name": "Identifier",
                                    "src": "1003:4:12"
                                  }
                                ],
                                "id": 3764,
                                "name": "MemberAccess",
                                "src": "1003:21:12"
                              }
                            ],
                            "id": 3765,
                            "name": "MemberAccess",
                            "src": "1003:26:12"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 3743,
                              "type": "address",
                              "value": "agent"
                            },
                            "id": 3766,
                            "name": "Identifier",
                            "src": "1030:5:12"
                          }
                        ],
                        "id": 3767,
                        "name": "FunctionCall",
                        "src": "1003:33:12"
                      }
                    ],
                    "id": 3768,
                    "name": "ExpressionStatement",
                    "src": "1003:33:12"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "=",
                          "type": "uint256"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": true,
                              "type": "uint256"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "member_name": "agentToIndex",
                                  "referencedDeclaration": 3735,
                                  "type": "mapping(address => uint256)"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 3741,
                                      "type": "struct PermissionsLib.Permissions storage pointer",
                                      "value": "self"
                                    },
                                    "id": 3769,
                                    "name": "Identifier",
                                    "src": "1046:4:12"
                                  }
                                ],
                                "id": 3772,
                                "name": "MemberAccess",
                                "src": "1046:17:12"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 3743,
                                  "type": "address",
                                  "value": "agent"
                                },
                                "id": 3771,
                                "name": "Identifier",
                                "src": "1064:5:12"
                              }
                            ],
                            "id": 3773,
                            "name": "IndexAccess",
                            "src": "1046:24:12"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "commonType": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              },
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "operator": "-",
                              "type": "uint256"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "member_name": "length",
                                  "referencedDeclaration": null,
                                  "type": "uint256"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "isConstant": false,
                                      "isLValue": true,
                                      "isPure": false,
                                      "lValueRequested": false,
                                      "member_name": "authorizedAgents",
                                      "referencedDeclaration": 3738,
                                      "type": "address[] storage ref"
                                    },
                                    "children": [
                                      {
                                        "attributes": {
                                          "argumentTypes": null,
                                          "overloadedDeclarations": [
                                            null
                                          ],
                                          "referencedDeclaration": 3741,
                                          "type": "struct PermissionsLib.Permissions storage pointer",
                                          "value": "self"
                                        },
                                        "id": 3774,
                                        "name": "Identifier",
                                        "src": "1073:4:12"
                                      }
                                    ],
                                    "id": 3775,
                                    "name": "MemberAccess",
                                    "src": "1073:21:12"
                                  }
                                ],
                                "id": 3776,
                                "name": "MemberAccess",
                                "src": "1073:28:12"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "hexvalue": "31",
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "lValueRequested": false,
                                  "subdenomination": null,
                                  "token": "number",
                                  "type": "int_const 1",
                                  "value": "1"
                                },
                                "id": 3777,
                                "name": "Literal",
                                "src": "1104:1:12"
                              }
                            ],
                            "id": 3778,
                            "name": "BinaryOperation",
                            "src": "1073:32:12"
                          }
                        ],
                        "id": 3779,
                        "name": "Assignment",
                        "src": "1046:59:12"
                      }
                    ],
                    "id": 3780,
                    "name": "ExpressionStatement",
                    "src": "1046:59:12"
                  }
                ],
                "id": 3781,
                "name": "Block",
                "src": "906:206:12"
              }
            ],
            "id": 3782,
            "name": "FunctionDefinition",
            "src": "825:287:12"
          },
          {
            "attributes": {
              "constant": false,
              "implemented": true,
              "isConstructor": false,
              "modifiers": [
                null
              ],
              "name": "revokeAuthorization",
              "payable": false,
              "scope": 3905,
              "stateMutability": "nonpayable",
              "superFunction": null,
              "visibility": "internal"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "self",
                      "scope": 3861,
                      "stateVariable": false,
                      "storageLocation": "storage",
                      "type": "struct PermissionsLib.Permissions storage pointer",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "contractScope": null,
                          "name": "Permissions",
                          "referencedDeclaration": 3739,
                          "type": "struct PermissionsLib.Permissions storage pointer"
                        },
                        "id": 3783,
                        "name": "UserDefinedTypeName",
                        "src": "1147:11:12"
                      }
                    ],
                    "id": 3784,
                    "name": "VariableDeclaration",
                    "src": "1147:24:12"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "agent",
                      "scope": 3861,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "type": "address"
                        },
                        "id": 3785,
                        "name": "ElementaryTypeName",
                        "src": "1173:7:12"
                      }
                    ],
                    "id": 3786,
                    "name": "VariableDeclaration",
                    "src": "1173:13:12"
                  }
                ],
                "id": 3787,
                "name": "ParameterList",
                "src": "1146:41:12"
              },
              {
                "attributes": {
                  "parameters": [
                    null
                  ]
                },
                "children": [],
                "id": 3788,
                "name": "ParameterList",
                "src": "1209:0:12"
              },
              {
                "children": [
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "type": "tuple()",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                }
                              ],
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 5478,
                              "type": "function (bool) pure",
                              "value": "require"
                            },
                            "id": 3789,
                            "name": "Identifier",
                            "src": "1388:7:12"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "isStructConstructorCall": false,
                              "lValueRequested": false,
                              "names": [
                                null
                              ],
                              "type": "bool",
                              "type_conversion": false
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": [
                                    {
                                      "typeIdentifier": "t_struct$_Permissions_$3739_storage_ptr",
                                      "typeString": "struct PermissionsLib.Permissions storage pointer"
                                    },
                                    {
                                      "typeIdentifier": "t_address",
                                      "typeString": "address"
                                    }
                                  ],
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 3876,
                                  "type": "function (struct PermissionsLib.Permissions storage pointer,address) view returns (bool)",
                                  "value": "isAuthorized"
                                },
                                "id": 3790,
                                "name": "Identifier",
                                "src": "1396:12:12"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 3784,
                                  "type": "struct PermissionsLib.Permissions storage pointer",
                                  "value": "self"
                                },
                                "id": 3791,
                                "name": "Identifier",
                                "src": "1409:4:12"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 3786,
                                  "type": "address",
                                  "value": "agent"
                                },
                                "id": 3792,
                                "name": "Identifier",
                                "src": "1415:5:12"
                              }
                            ],
                            "id": 3793,
                            "name": "FunctionCall",
                            "src": "1396:25:12"
                          }
                        ],
                        "id": 3794,
                        "name": "FunctionCall",
                        "src": "1388:34:12"
                      }
                    ],
                    "id": 3795,
                    "name": "ExpressionStatement",
                    "src": "1388:34:12"
                  },
                  {
                    "attributes": {
                      "assignments": [
                        3797
                      ]
                    },
                    "children": [
                      {
                        "attributes": {
                          "constant": false,
                          "name": "indexOfAgentToRevoke",
                          "scope": 3861,
                          "stateVariable": false,
                          "storageLocation": "default",
                          "type": "uint256",
                          "value": null,
                          "visibility": "internal"
                        },
                        "children": [
                          {
                            "attributes": {
                              "name": "uint",
                              "type": "uint256"
                            },
                            "id": 3796,
                            "name": "ElementaryTypeName",
                            "src": "1433:4:12"
                          }
                        ],
                        "id": 3797,
                        "name": "VariableDeclaration",
                        "src": "1433:25:12"
                      },
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "type": "uint256"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "member_name": "agentToIndex",
                              "referencedDeclaration": 3735,
                              "type": "mapping(address => uint256)"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 3784,
                                  "type": "struct PermissionsLib.Permissions storage pointer",
                                  "value": "self"
                                },
                                "id": 3798,
                                "name": "Identifier",
                                "src": "1461:4:12"
                              }
                            ],
                            "id": 3799,
                            "name": "MemberAccess",
                            "src": "1461:17:12"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 3786,
                              "type": "address",
                              "value": "agent"
                            },
                            "id": 3800,
                            "name": "Identifier",
                            "src": "1479:5:12"
                          }
                        ],
                        "id": 3801,
                        "name": "IndexAccess",
                        "src": "1461:24:12"
                      }
                    ],
                    "id": 3802,
                    "name": "VariableDeclarationStatement",
                    "src": "1433:52:12"
                  },
                  {
                    "attributes": {
                      "assignments": [
                        3804
                      ]
                    },
                    "children": [
                      {
                        "attributes": {
                          "constant": false,
                          "name": "indexOfAgentToMove",
                          "scope": 3861,
                          "stateVariable": false,
                          "storageLocation": "default",
                          "type": "uint256",
                          "value": null,
                          "visibility": "internal"
                        },
                        "children": [
                          {
                            "attributes": {
                              "name": "uint",
                              "type": "uint256"
                            },
                            "id": 3803,
                            "name": "ElementaryTypeName",
                            "src": "1495:4:12"
                          }
                        ],
                        "id": 3804,
                        "name": "VariableDeclaration",
                        "src": "1495:23:12"
                      },
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "-",
                          "type": "uint256"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "member_name": "length",
                              "referencedDeclaration": null,
                              "type": "uint256"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "member_name": "authorizedAgents",
                                  "referencedDeclaration": 3738,
                                  "type": "address[] storage ref"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 3784,
                                      "type": "struct PermissionsLib.Permissions storage pointer",
                                      "value": "self"
                                    },
                                    "id": 3805,
                                    "name": "Identifier",
                                    "src": "1521:4:12"
                                  }
                                ],
                                "id": 3806,
                                "name": "MemberAccess",
                                "src": "1521:21:12"
                              }
                            ],
                            "id": 3807,
                            "name": "MemberAccess",
                            "src": "1521:28:12"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "hexvalue": "31",
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "lValueRequested": false,
                              "subdenomination": null,
                              "token": "number",
                              "type": "int_const 1",
                              "value": "1"
                            },
                            "id": 3808,
                            "name": "Literal",
                            "src": "1552:1:12"
                          }
                        ],
                        "id": 3809,
                        "name": "BinaryOperation",
                        "src": "1521:32:12"
                      }
                    ],
                    "id": 3810,
                    "name": "VariableDeclarationStatement",
                    "src": "1495:58:12"
                  },
                  {
                    "attributes": {
                      "assignments": [
                        3812
                      ]
                    },
                    "children": [
                      {
                        "attributes": {
                          "constant": false,
                          "name": "agentToMove",
                          "scope": 3861,
                          "stateVariable": false,
                          "storageLocation": "default",
                          "type": "address",
                          "value": null,
                          "visibility": "internal"
                        },
                        "children": [
                          {
                            "attributes": {
                              "name": "address",
                              "type": "address"
                            },
                            "id": 3811,
                            "name": "ElementaryTypeName",
                            "src": "1563:7:12"
                          }
                        ],
                        "id": 3812,
                        "name": "VariableDeclaration",
                        "src": "1563:19:12"
                      },
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "type": "address"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "member_name": "authorizedAgents",
                              "referencedDeclaration": 3738,
                              "type": "address[] storage ref"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 3784,
                                  "type": "struct PermissionsLib.Permissions storage pointer",
                                  "value": "self"
                                },
                                "id": 3813,
                                "name": "Identifier",
                                "src": "1585:4:12"
                              }
                            ],
                            "id": 3814,
                            "name": "MemberAccess",
                            "src": "1585:21:12"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 3804,
                              "type": "uint256",
                              "value": "indexOfAgentToMove"
                            },
                            "id": 3815,
                            "name": "Identifier",
                            "src": "1607:18:12"
                          }
                        ],
                        "id": 3816,
                        "name": "IndexAccess",
                        "src": "1585:41:12"
                      }
                    ],
                    "id": 3817,
                    "name": "VariableDeclarationStatement",
                    "src": "1563:63:12"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "delete",
                          "prefix": true,
                          "type": "tuple()"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": true,
                              "type": "bool"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "member_name": "authorized",
                                  "referencedDeclaration": 3731,
                                  "type": "mapping(address => bool)"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 3784,
                                      "type": "struct PermissionsLib.Permissions storage pointer",
                                      "value": "self"
                                    },
                                    "id": 3818,
                                    "name": "Identifier",
                                    "src": "1689:4:12"
                                  }
                                ],
                                "id": 3819,
                                "name": "MemberAccess",
                                "src": "1689:15:12"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 3786,
                                  "type": "address",
                                  "value": "agent"
                                },
                                "id": 3820,
                                "name": "Identifier",
                                "src": "1705:5:12"
                              }
                            ],
                            "id": 3821,
                            "name": "IndexAccess",
                            "src": "1689:22:12"
                          }
                        ],
                        "id": 3822,
                        "name": "UnaryOperation",
                        "src": "1682:29:12"
                      }
                    ],
                    "id": 3823,
                    "name": "ExpressionStatement",
                    "src": "1682:29:12"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "=",
                          "type": "address"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": true,
                              "type": "address"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "member_name": "authorizedAgents",
                                  "referencedDeclaration": 3738,
                                  "type": "address[] storage ref"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 3784,
                                      "type": "struct PermissionsLib.Permissions storage pointer",
                                      "value": "self"
                                    },
                                    "id": 3824,
                                    "name": "Identifier",
                                    "src": "1792:4:12"
                                  }
                                ],
                                "id": 3827,
                                "name": "MemberAccess",
                                "src": "1792:21:12"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 3797,
                                  "type": "uint256",
                                  "value": "indexOfAgentToRevoke"
                                },
                                "id": 3826,
                                "name": "Identifier",
                                "src": "1814:20:12"
                              }
                            ],
                            "id": 3828,
                            "name": "IndexAccess",
                            "src": "1792:43:12"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 3812,
                              "type": "address",
                              "value": "agentToMove"
                            },
                            "id": 3829,
                            "name": "Identifier",
                            "src": "1838:11:12"
                          }
                        ],
                        "id": 3830,
                        "name": "Assignment",
                        "src": "1792:57:12"
                      }
                    ],
                    "id": 3831,
                    "name": "ExpressionStatement",
                    "src": "1792:57:12"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "=",
                          "type": "uint256"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": true,
                              "type": "uint256"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "member_name": "agentToIndex",
                                  "referencedDeclaration": 3735,
                                  "type": "mapping(address => uint256)"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 3784,
                                      "type": "struct PermissionsLib.Permissions storage pointer",
                                      "value": "self"
                                    },
                                    "id": 3832,
                                    "name": "Identifier",
                                    "src": "1920:4:12"
                                  }
                                ],
                                "id": 3835,
                                "name": "MemberAccess",
                                "src": "1920:17:12"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 3812,
                                  "type": "address",
                                  "value": "agentToMove"
                                },
                                "id": 3834,
                                "name": "Identifier",
                                "src": "1938:11:12"
                              }
                            ],
                            "id": 3836,
                            "name": "IndexAccess",
                            "src": "1920:30:12"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 3797,
                              "type": "uint256",
                              "value": "indexOfAgentToRevoke"
                            },
                            "id": 3837,
                            "name": "Identifier",
                            "src": "1953:20:12"
                          }
                        ],
                        "id": 3838,
                        "name": "Assignment",
                        "src": "1920:53:12"
                      }
                    ],
                    "id": 3839,
                    "name": "ExpressionStatement",
                    "src": "1920:53:12"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "delete",
                          "prefix": true,
                          "type": "tuple()"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": true,
                              "type": "uint256"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "member_name": "agentToIndex",
                                  "referencedDeclaration": 3735,
                                  "type": "mapping(address => uint256)"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 3784,
                                      "type": "struct PermissionsLib.Permissions storage pointer",
                                      "value": "self"
                                    },
                                    "id": 3840,
                                    "name": "Identifier",
                                    "src": "1990:4:12"
                                  }
                                ],
                                "id": 3841,
                                "name": "MemberAccess",
                                "src": "1990:17:12"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 3786,
                                  "type": "address",
                                  "value": "agent"
                                },
                                "id": 3842,
                                "name": "Identifier",
                                "src": "2008:5:12"
                              }
                            ],
                            "id": 3843,
                            "name": "IndexAccess",
                            "src": "1990:24:12"
                          }
                        ],
                        "id": 3844,
                        "name": "UnaryOperation",
                        "src": "1983:31:12"
                      }
                    ],
                    "id": 3845,
                    "name": "ExpressionStatement",
                    "src": "1983:31:12"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "delete",
                          "prefix": true,
                          "type": "tuple()"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": true,
                              "type": "address"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "member_name": "authorizedAgents",
                                  "referencedDeclaration": 3738,
                                  "type": "address[] storage ref"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 3784,
                                      "type": "struct PermissionsLib.Permissions storage pointer",
                                      "value": "self"
                                    },
                                    "id": 3846,
                                    "name": "Identifier",
                                    "src": "2088:4:12"
                                  }
                                ],
                                "id": 3847,
                                "name": "MemberAccess",
                                "src": "2088:21:12"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 3804,
                                  "type": "uint256",
                                  "value": "indexOfAgentToMove"
                                },
                                "id": 3848,
                                "name": "Identifier",
                                "src": "2110:18:12"
                              }
                            ],
                            "id": 3849,
                            "name": "IndexAccess",
                            "src": "2088:41:12"
                          }
                        ],
                        "id": 3850,
                        "name": "UnaryOperation",
                        "src": "2081:48:12"
                      }
                    ],
                    "id": 3851,
                    "name": "ExpressionStatement",
                    "src": "2081:48:12"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "-=",
                          "type": "uint256"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": true,
                              "member_name": "length",
                              "referencedDeclaration": null,
                              "type": "uint256"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "member_name": "authorizedAgents",
                                  "referencedDeclaration": 3738,
                                  "type": "address[] storage ref"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 3784,
                                      "type": "struct PermissionsLib.Permissions storage pointer",
                                      "value": "self"
                                    },
                                    "id": 3852,
                                    "name": "Identifier",
                                    "src": "2139:4:12"
                                  }
                                ],
                                "id": 3855,
                                "name": "MemberAccess",
                                "src": "2139:21:12"
                              }
                            ],
                            "id": 3856,
                            "name": "MemberAccess",
                            "src": "2139:28:12"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "hexvalue": "31",
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "lValueRequested": false,
                              "subdenomination": null,
                              "token": "number",
                              "type": "int_const 1",
                              "value": "1"
                            },
                            "id": 3857,
                            "name": "Literal",
                            "src": "2171:1:12"
                          }
                        ],
                        "id": 3858,
                        "name": "Assignment",
                        "src": "2139:33:12"
                      }
                    ],
                    "id": 3859,
                    "name": "ExpressionStatement",
                    "src": "2139:33:12"
                  }
                ],
                "id": 3860,
                "name": "Block",
                "src": "1209:970:12"
              }
            ],
            "id": 3861,
            "name": "FunctionDefinition",
            "src": "1118:1061:12"
          },
          {
            "attributes": {
              "constant": true,
              "implemented": true,
              "isConstructor": false,
              "modifiers": [
                null
              ],
              "name": "isAuthorized",
              "payable": false,
              "scope": 3905,
              "stateMutability": "view",
              "superFunction": null,
              "visibility": "internal"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "self",
                      "scope": 3876,
                      "stateVariable": false,
                      "storageLocation": "storage",
                      "type": "struct PermissionsLib.Permissions storage pointer",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "contractScope": null,
                          "name": "Permissions",
                          "referencedDeclaration": 3739,
                          "type": "struct PermissionsLib.Permissions storage pointer"
                        },
                        "id": 3862,
                        "name": "UserDefinedTypeName",
                        "src": "2207:11:12"
                      }
                    ],
                    "id": 3863,
                    "name": "VariableDeclaration",
                    "src": "2207:24:12"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "agent",
                      "scope": 3876,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "type": "address"
                        },
                        "id": 3864,
                        "name": "ElementaryTypeName",
                        "src": "2233:7:12"
                      }
                    ],
                    "id": 3865,
                    "name": "VariableDeclaration",
                    "src": "2233:13:12"
                  }
                ],
                "id": 3866,
                "name": "ParameterList",
                "src": "2206:41:12"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "",
                      "scope": 3876,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "bool",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "bool",
                          "type": "bool"
                        },
                        "id": 3867,
                        "name": "ElementaryTypeName",
                        "src": "2295:4:12"
                      }
                    ],
                    "id": 3868,
                    "name": "VariableDeclaration",
                    "src": "2295:4:12"
                  }
                ],
                "id": 3869,
                "name": "ParameterList",
                "src": "2294:6:12"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "functionReturnParameters": 3869
                    },
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "type": "bool"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "member_name": "authorized",
                              "referencedDeclaration": 3731,
                              "type": "mapping(address => bool)"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 3863,
                                  "type": "struct PermissionsLib.Permissions storage pointer",
                                  "value": "self"
                                },
                                "id": 3870,
                                "name": "Identifier",
                                "src": "2322:4:12"
                              }
                            ],
                            "id": 3871,
                            "name": "MemberAccess",
                            "src": "2322:15:12"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 3865,
                              "type": "address",
                              "value": "agent"
                            },
                            "id": 3872,
                            "name": "Identifier",
                            "src": "2338:5:12"
                          }
                        ],
                        "id": 3873,
                        "name": "IndexAccess",
                        "src": "2322:22:12"
                      }
                    ],
                    "id": 3874,
                    "name": "Return",
                    "src": "2315:29:12"
                  }
                ],
                "id": 3875,
                "name": "Block",
                "src": "2305:46:12"
              }
            ],
            "id": 3876,
            "name": "FunctionDefinition",
            "src": "2185:166:12"
          },
          {
            "attributes": {
              "constant": true,
              "implemented": true,
              "isConstructor": false,
              "modifiers": [
                null
              ],
              "name": "isNotAuthorized",
              "payable": false,
              "scope": 3905,
              "stateMutability": "view",
              "superFunction": null,
              "visibility": "internal"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "self",
                      "scope": 3892,
                      "stateVariable": false,
                      "storageLocation": "storage",
                      "type": "struct PermissionsLib.Permissions storage pointer",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "contractScope": null,
                          "name": "Permissions",
                          "referencedDeclaration": 3739,
                          "type": "struct PermissionsLib.Permissions storage pointer"
                        },
                        "id": 3877,
                        "name": "UserDefinedTypeName",
                        "src": "2382:11:12"
                      }
                    ],
                    "id": 3878,
                    "name": "VariableDeclaration",
                    "src": "2382:24:12"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "agent",
                      "scope": 3892,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "type": "address"
                        },
                        "id": 3879,
                        "name": "ElementaryTypeName",
                        "src": "2408:7:12"
                      }
                    ],
                    "id": 3880,
                    "name": "VariableDeclaration",
                    "src": "2408:13:12"
                  }
                ],
                "id": 3881,
                "name": "ParameterList",
                "src": "2381:41:12"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "",
                      "scope": 3892,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "bool",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "bool",
                          "type": "bool"
                        },
                        "id": 3882,
                        "name": "ElementaryTypeName",
                        "src": "2470:4:12"
                      }
                    ],
                    "id": 3883,
                    "name": "VariableDeclaration",
                    "src": "2470:4:12"
                  }
                ],
                "id": 3884,
                "name": "ParameterList",
                "src": "2469:6:12"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "functionReturnParameters": 3884
                    },
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "!",
                          "prefix": true,
                          "type": "bool"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "isStructConstructorCall": false,
                              "lValueRequested": false,
                              "names": [
                                null
                              ],
                              "type": "bool",
                              "type_conversion": false
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": [
                                    {
                                      "typeIdentifier": "t_struct$_Permissions_$3739_storage_ptr",
                                      "typeString": "struct PermissionsLib.Permissions storage pointer"
                                    },
                                    {
                                      "typeIdentifier": "t_address",
                                      "typeString": "address"
                                    }
                                  ],
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 3876,
                                  "type": "function (struct PermissionsLib.Permissions storage pointer,address) view returns (bool)",
                                  "value": "isAuthorized"
                                },
                                "id": 3885,
                                "name": "Identifier",
                                "src": "2498:12:12"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 3878,
                                  "type": "struct PermissionsLib.Permissions storage pointer",
                                  "value": "self"
                                },
                                "id": 3886,
                                "name": "Identifier",
                                "src": "2511:4:12"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 3880,
                                  "type": "address",
                                  "value": "agent"
                                },
                                "id": 3887,
                                "name": "Identifier",
                                "src": "2517:5:12"
                              }
                            ],
                            "id": 3888,
                            "name": "FunctionCall",
                            "src": "2498:25:12"
                          }
                        ],
                        "id": 3889,
                        "name": "UnaryOperation",
                        "src": "2497:26:12"
                      }
                    ],
                    "id": 3890,
                    "name": "Return",
                    "src": "2490:33:12"
                  }
                ],
                "id": 3891,
                "name": "Block",
                "src": "2480:50:12"
              }
            ],
            "id": 3892,
            "name": "FunctionDefinition",
            "src": "2357:173:12"
          },
          {
            "attributes": {
              "constant": true,
              "implemented": true,
              "isConstructor": false,
              "modifiers": [
                null
              ],
              "name": "getAuthorizedAgents",
              "payable": false,
              "scope": 3905,
              "stateMutability": "view",
              "superFunction": null,
              "visibility": "internal"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "self",
                      "scope": 3904,
                      "stateVariable": false,
                      "storageLocation": "storage",
                      "type": "struct PermissionsLib.Permissions storage pointer",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "contractScope": null,
                          "name": "Permissions",
                          "referencedDeclaration": 3739,
                          "type": "struct PermissionsLib.Permissions storage pointer"
                        },
                        "id": 3893,
                        "name": "UserDefinedTypeName",
                        "src": "2565:11:12"
                      }
                    ],
                    "id": 3894,
                    "name": "VariableDeclaration",
                    "src": "2565:24:12"
                  }
                ],
                "id": 3895,
                "name": "ParameterList",
                "src": "2564:26:12"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "",
                      "scope": 3904,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address[] memory",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "length": null,
                          "type": "address[] storage pointer"
                        },
                        "children": [
                          {
                            "attributes": {
                              "name": "address",
                              "type": "address"
                            },
                            "id": 3896,
                            "name": "ElementaryTypeName",
                            "src": "2638:7:12"
                          }
                        ],
                        "id": 3897,
                        "name": "ArrayTypeName",
                        "src": "2638:9:12"
                      }
                    ],
                    "id": 3898,
                    "name": "VariableDeclaration",
                    "src": "2638:9:12"
                  }
                ],
                "id": 3899,
                "name": "ParameterList",
                "src": "2637:11:12"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "functionReturnParameters": 3899
                    },
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "member_name": "authorizedAgents",
                          "referencedDeclaration": 3738,
                          "type": "address[] storage ref"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 3894,
                              "type": "struct PermissionsLib.Permissions storage pointer",
                              "value": "self"
                            },
                            "id": 3900,
                            "name": "Identifier",
                            "src": "2670:4:12"
                          }
                        ],
                        "id": 3901,
                        "name": "MemberAccess",
                        "src": "2670:21:12"
                      }
                    ],
                    "id": 3902,
                    "name": "Return",
                    "src": "2663:28:12"
                  }
                ],
                "id": 3903,
                "name": "Block",
                "src": "2653:45:12"
              }
            ],
            "id": 3904,
            "name": "FunctionDefinition",
            "src": "2536:162:12"
          }
        ],
        "id": 3905,
        "name": "ContractDefinition",
        "src": "610:2090:12"
      }
    ],
    "id": 3906,
    "name": "SourceUnit",
    "src": "584:2117:12"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.18+commit.9cf6e910.Emscripten.clang"
  },
  "networks": {
    "42": {
      "events": {},
      "links": {},
      "address": "0x0a70eec53f50d42988bdf7a8dc3479b749baac6f"
    },
    "70": {
      "events": {},
      "links": {},
      "address": "0xc13d026d7e4e6c2864240aa1f26bb436c6271338"
    }
  },
  "schemaVersion": "1.0.1",
  "updatedAt": "2018-03-19T22:48:21.266Z"
}