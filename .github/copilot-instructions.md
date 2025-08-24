<!--
Copyright (c) 2024 AI Processing Layer Project
Repository: https://github.com/mupoese/ai-processing-layer/
Licensed under the Apache License, Version 2.0
-->

# AI Processing Layer
AI Processing Layer is a system designed to handle AI/ML workflows, data processing, and model inference. This repository provides the core processing infrastructure for AI operations.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Current Repository State
- **IMPORTANT**: This repository is in early development stage with minimal code
- Currently contains only basic environment configuration (.env file)
- No build system or dependencies are currently implemented
- These instructions will be updated as the codebase develops

### Environment Setup
- Check the `.env` file for required environment variables
- **Available tools**: Python 3.12.3, Node.js 20.19.4, npm 10.8.2, git 2.51.0, Docker 28.0.4
- For AI/ML projects, typically requires Python 3.8+ or Node.js 16+ depending on implementation
- May require GPU drivers and CUDA for machine learning workloads
- Always verify environment variables are properly configured before proceeding

### Validated Environment Commands
```bash
# Python virtual environment (TESTED AND WORKING)
python3 -m venv venv  # Takes ~3 seconds
source venv/bin/activate  # On Linux/Mac
python --version  # Verify activation
deactivate  # When done

# Package management tools available
pip3 --version  # Python package manager
npm --version   # Node.js package manager
docker --version  # Container platform available

# Container support (if needed for AI workloads)
docker run --rm hello-world  # Test Docker functionality
```

### Development Workflow (To Be Implemented)
Since this is a new repository, follow these patterns when setting up the codebase:

#### For Python-based AI Processing (VALIDATED):
```bash
# TESTED AND WORKING commands:
python3 -m venv venv
source venv/bin/activate  # On Linux/Mac
# venv\Scripts\activate   # On Windows

# Common AI/ML packages install successfully:
pip install numpy pandas scikit-learn  # Takes 15-20 seconds. NEVER CANCEL. Set timeout to 60+ seconds.
pip install -r requirements.txt  # When requirements.txt exists

# Validation: Test imports work
python3 -c "import numpy, pandas, sklearn; print('All packages imported successfully')"
```

#### For Node.js-based AI Processing (PARTIALLY VALIDATED):
```bash
# TESTED AND WORKING commands:
npm init -y  # Initialize project
npm install axios lodash  # Basic data processing packages work
npm install  # When package.json exists

# NOTE: TensorFlow.js installation currently fails due to network/archive issues
# Error: "TAR_BAD_ARCHIVE: Unrecognized archive format" when installing @tensorflow/tfjs-node
# Use alternative ML libraries or Python-based approach for now
```

### Build and Test (To Be Implemented)
**NEVER CANCEL BUILDS OR TESTS** - AI/ML operations can be extremely time-consuming:
- Model training: Can take hours to days. NEVER CANCEL. Set timeout to 24+ hours.
- Large dataset processing: Can take 30+ minutes. NEVER CANCEL. Set timeout to 60+ minutes.
- Integration tests with AI models: Can take 10+ minutes. NEVER CANCEL. Set timeout to 30+ minutes.
- Package installation: Takes 15-60 seconds. NEVER CANCEL. Set timeout to 5+ minutes.

**MEASURED TIMINGS FROM VALIDATION**:
- Virtual environment creation: ~3 seconds
- Basic ML package installation (numpy, pandas, scikit-learn): ~18 seconds
- Simple ML model training (small dataset): 1-5 seconds
- Complex ML model training (larger dataset): 10+ seconds to minutes

When build system is implemented, expect commands like:
```bash
# Python projects
python -m pytest  # Takes 5-15 minutes typically. NEVER CANCEL. Set timeout to 30+ minutes.
python setup.py build

# Node.js projects  
npm test  # Takes 2-10 minutes typically. NEVER CANCEL. Set timeout to 20+ minutes.
npm run build  # Takes 1-5 minutes typically. NEVER CANCEL. Set timeout to 15+ minutes.

# Containerized builds (Docker available)
docker build -t ai-processing-layer .  # Can take 5-30 minutes. NEVER CANCEL. Set timeout to 60+ minutes.
```

### Running the Application (To Be Implemented)
Typical patterns for AI processing layers:
```bash
# API server mode
npm start
# or
python app.py

# Batch processing mode
python process_data.py --input data/ --output results/

# Model inference mode
python inference.py --model models/latest.pkl --data input.json

# Containerized deployment (Docker available and TESTED)
docker run --rm hello-world  # Verified working
docker build -t ai-processing-layer .  # When Dockerfile exists
docker run -p 8080:8080 ai-processing-layer  # Run containerized app
```

### System Resources (VALIDATED)
- **CPU**: AMD EPYC 7763 64-Core Processor (4 cores available)
- **Memory**: 15GB total, ~14GB available (use `free -h` to check current usage)
- **GPU**: No NVIDIA GPU available (nvidia-smi not found)
- **Containers**: Docker 28.0.4 fully functional
- **Storage**: Use `df -h` to check disk space before large data operations

## Validation

### Manual Testing Requirements
**CRITICAL**: Always validate AI processing functionality with real data:

#### VALIDATED SCENARIOS:
1. **Python ML Pipeline (TESTED AND WORKING)**:
   ```bash
   # Create virtual environment
   python3 -m venv venv && source venv/bin/activate
   
   # Install ML packages (takes 30-60 seconds)
   pip install numpy pandas scikit-learn
   
   # Test complete ML workflow
   python3 -c "
   import numpy as np
   from sklearn.ensemble import RandomForestClassifier
   from sklearn.model_selection import train_test_split
   from sklearn.metrics import accuracy_score
   
   # Create and process sample data
   X = np.random.randn(1000, 10)
   y = (X[:, 0] + X[:, 1] > 0).astype(int)
   X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
   
   # Train and evaluate model
   model = RandomForestClassifier(n_estimators=100)
   model.fit(X_train, y_train)
   accuracy = accuracy_score(y_test, model.predict(X_test))
   print(f'Accuracy: {accuracy:.3f}')
   "
   ```

2. **Node.js Data Processing (TESTED AND WORKING)**:
   ```bash
   # Initialize project
   npm init -y
   
   # Install data processing packages
   npm install axios lodash
   
   # Test data processing workflow
   node -e "
   const _ = require('lodash');
   const data = [{id: 1, value: 10}, {id: 2, value: 20}];
   console.log('Average:', _.meanBy(data, 'value'));
   "
   ```

#### KNOWN LIMITATIONS:
- **TensorFlow.js**: Installation currently fails with "TAR_BAD_ARCHIVE" error
- **Network timeouts**: pip install may timeout when downloading from PyPI under poor network conditions
  - Error: "HTTPSConnectionPool(host='pypi.org', port=443): Read timed out"
  - **Workaround**: Retry installation or use `pip install --timeout 300` for longer timeout
- **Alternative**: Use Python-based ML libraries for now

#### Installation Troubleshooting:
```bash
# If pip install times out, try:
pip install --timeout 300 numpy pandas scikit-learn  # Longer timeout
# or
pip install --retries 3 numpy pandas scikit-learn    # Retry on failure
# or install packages one at a time:
pip install numpy
pip install pandas  
pip install scikit-learn
```

#### Additional Testing (When Implemented):

3. **Data Processing Pipeline**: 
   - Test with sample datasets of various sizes (small, medium, large)
   - Verify output quality and format
   - Check processing time is reasonable

4. **Model Operations** (when implemented):
   - Test model loading and initialization
   - Verify inference with sample inputs
   - Check output format and accuracy
   - Test model performance under load

5. **API Endpoints** (when implemented):
   - Test all endpoints with valid and invalid data
   - Verify response formats and error handling
   - Test concurrent requests
   - Validate rate limiting if implemented

6. **Error Handling**:
   - Test with malformed data
   - Test with missing dependencies
   - Test with insufficient resources (memory, GPU)
   - Verify graceful degradation

### Performance Validation
- Always monitor memory usage during large data processing
- Check GPU utilization if using GPU acceleration
- Validate processing time meets performance requirements
- Test with production-sized datasets when possible

## Common Tasks

### Repository Root
Current structure:
```
.
..
.env
.git/
```

### Environment Configuration
```bash
cat .env
```
Contains:
```
GITHUB_TOKEN="empty"
```

### Adding New Dependencies
When implementing the project:

**For Python projects**:
```bash
# Add to requirements.txt or pyproject.toml
pip install <package>
pip freeze > requirements.txt
```

**For Node.js projects**:
```bash
# Add to package.json
npm install <package>
# or for dev dependencies
npm install --save-dev <package>
```

### Code Quality and Linting (To Be Implemented)
Always run these before committing (commands will vary based on implementation):
```bash
# Python projects
black .  # Code formatting
flake8 .  # Linting
mypy .  # Type checking

# Node.js projects
npm run lint  # ESLint
npm run format  # Prettier
npm run type-check  # TypeScript checking
```

## AI/ML Specific Considerations

### Containerized AI Workflows (VALIDATED - Docker Available)
```bash
# Docker is fully functional - validated with hello-world
docker --version  # Docker version 28.0.4

# Common AI container patterns (when Dockerfile exists):
docker build -t ai-processing-layer .  # Build AI container. Can take 5-30 minutes. NEVER CANCEL.
docker run -it ai-processing-layer python train_model.py  # Run training in container
docker run -p 8080:8080 ai-processing-layer  # Run inference API
docker run --rm -v $(pwd)/data:/data ai-processing-layer python process.py /data  # Mount data volume

# For GPU workloads (when available):
# docker run --gpus all ai-processing-layer python gpu_train.py
# Note: No GPU currently available (nvidia-smi not found)
```

### Data Handling
- Always validate data schemas before processing
- Implement proper data versioning
- Use appropriate data storage solutions (databases, cloud storage)
- Handle sensitive data according to privacy requirements

### Model Management
- Version control models separately from code
- Implement model validation and testing pipelines
- Monitor model performance in production
- Plan for model updates and rollbacks

### Resource Management
- Monitor memory usage during large data operations
- Implement proper cleanup of temporary files
- Use streaming for large datasets when possible
- Consider distributed processing for very large workloads

### Security
- Sanitize all input data
- Implement proper authentication for APIs
- Secure model files and sensitive configurations
- Monitor for adversarial inputs

## Troubleshooting

### Common Issues
1. **Out of Memory**: Reduce batch sizes, use streaming, or increase system memory
2. **Slow Processing**: Check data preprocessing efficiency, consider GPU acceleration
3. **Model Loading Failures**: Verify model file integrity and compatibility
4. **Dependency Conflicts**: Use virtual environments, check version compatibility
5. **Network Timeouts**: 
   - pip install failures due to PyPI timeouts
   - Use longer timeouts: `pip install --timeout 300 package_name`
   - Retry failed installations: `pip install --retries 3 package_name`
   - Install packages individually if bulk installation fails

### Performance Issues
- Profile code to identify bottlenecks
- Monitor system resources (CPU, memory, GPU)
- Consider caching frequently used data
- Implement proper logging for debugging

### Development Tips
- Start with small datasets during development
- Implement comprehensive logging
- Use configuration files for hyperparameters
- Test with different data distributions
- Validate model outputs against expected results

## Future Development
As this repository evolves, update these instructions to include:
- Specific build commands and their measured execution times
- Detailed testing procedures
- Production deployment instructions
- Monitoring and observability setup
- Specific validation scenarios for the implemented AI processing capabilities

## Quick Environment Verification
Run this command to verify the basic environment is working:
```bash
python3 -c "
print('=== AI Environment Check ===')
import sys, os, json, random, math, time
print(f'✅ Python {sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}')
data = [{'val': random.random()} for _ in range(100)]
processed = [{'val': d['val'], 'log': math.log(d['val'] + 1)} for d in data]
print(f'✅ Processed {len(processed)} items')
print('✅ Environment ready for AI development')
"
```

Expected output: Successful processing of sample data with no errors.

---

**Last Updated**: Based on validation performed on Ubuntu system with Python 3.12.3, Node.js 20.19.4, Docker 28.0.4
**Known Working**: Python ML workflows, basic data processing, containerization
**Known Issues**: TensorFlow.js installation, network timeouts during package installation